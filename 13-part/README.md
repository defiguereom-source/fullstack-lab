# Ejercicio Sesiones del lado del servidor

Implementación completa del ejercicio 13.24 de Full Stack Open con React + TypeScript (frontend) y Node.js + Express + Sequelize + PostgreSQL (backend).

---

## Estructura del proyecto

```
ex1324/
├── backend/
│   ├── controllers/
│   │   ├── login.js       # POST /api/login — crea sesión en BD
│   │   ├── logout.js      # DELETE /api/logout — elimina sesión
│   │   ├── notes.js       # CRUD de notas
│   │   └── users.js       # Registro de usuarios
│   ├── middleware/
│   │   └── auth.js        # tokenExtractor + sessionValidator
│   ├── migrations/
│   │   ├── 20240001_create_users.js   # tabla users 
│   │   ├── 20240002_create_notes.js   # tabla notes
│   │   └── 20240003_create_sessions.js # tabla sessions 
│   ├── models/
│   │   ├── user.js
│   │   ├── note.js
│   │   ├── session.js     # Modelo Session 
│   │   └── index.js       # Asociaciones
│   ├── utils/
│   │   ├── db.js          # Conexión Sequelize
│   │   └── migrations.js  # Umzug runner
│   └── index.js           # App Express
└── frontend/
    └── src/
        ├── hooks/
        │   ├── useAuth.ts  # login / logout con localStorage
        │   └── useNotes.ts # CRUD de notas
        ├── services/
        │   └── api.ts      # axios con Bearer token
        ├── components/
        │   ├── LoginForm.tsx
        │   ├── NoteForm.tsx
        │   └── NoteItem.tsx
        ├── types/index.ts
        └── App.tsx
```

---

## Qué implementa el ejercicio 

### 1. Campo `disabled` en usuarios
```sql
-- tabla users tiene columna:
disabled BOOLEAN DEFAULT false
```
Para deshabilitar un usuario directamente en la BD:
```sql
UPDATE users SET disabled = true WHERE username = 'someuser';
```

### 2. Tabla `sessions` (sesiones activas)
```sql
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  token VARCHAR(512) UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### 3. POST /api/login — guarda sesión
```js
const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '24h' })
await Session.create({ token, userId: user.id })   
```

### 4. Middleware `sessionValidator`
Verifica en cada solicitud protegida:
1. ¿El token JWT es válido?
2. ¿Existe la sesión en la tabla `sessions`? 
3. ¿El usuario está habilitado (`disabled = false`)?

```js
const session = await Session.findOne({ where: { token: req.token } })
if (!session) return res.status(401).json({ error: 'Session expired or logged out' })

const user = await User.findByPk(decodedToken.id)
if (user.disabled) {
  await session.destroy()  
  return res.status(401).json({ error: 'User account is disabled' })
}
```

### 5. DELETE /api/logout — invalida el token
```js
await Session.destroy({ where: { token: req.token } })
// El token ya no existe en BD → futuras solicitudes con ese token son rechazadas
```

---

## Instalación y uso

### Requisitos
- Node.js 18+
- PostgreSQL corriendo localmente

### Backend
```bash
cd backend
cp .env.example .env
# Edita .env con tus credenciales de PostgreSQL (LocalHost)
npm install
npm start
# Las migraciones se corren automáticamente al iniciar
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Abre http://localhost:5173
```

### Variables de entorno (backend)
```
DATABASE_URL=postgres://user:password@localhost:5432/notesdb
SECRET=tu_clave_secreta_larga
PORT=3001
```

---

## Endpoints

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | /api/users | — | Registrar usuario |
| GET | /api/users | — | Listar usuarios |
| POST | /api/login | — | Iniciar sesión |
| DELETE | /api/logout | ✓ | Cerrar sesión |
| GET | /api/notes | — | Ver notas |
| POST | /api/notes | ✓ | Crear nota |
| PUT | /api/notes/:id | ✓ | Actualizar nota |
| DELETE | /api/notes/:id | ✓ | Eliminar nota |

---

## Prueba del comportamiento clave

```bash
# 1. Login — obtén el token
TOKEN=$(curl -s -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"secret"}' | jq -r '.token')

# 2. Crear una nota (funciona)
curl -X POST http://localhost:3001/api/notes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content":"Mi nota","important":false}'

# 3. Logout — elimina la sesión de la BD
curl -X DELETE http://localhost:3001/api/logout \
  -H "Authorization: Bearer $TOKEN"

# 4. Intentar usar el mismo token → 401 "Session expired or logged out"
curl -X POST http://localhost:3001/api/notes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content":"No debería funcionar","important":false}'
```
