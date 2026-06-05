require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { sequelize } = require('./utils/db')
const { runMigrations } = require('./utils/migrations')
const { tokenExtractor, sessionValidator } = require('./middleware/auth')

const { login } = require('./controllers/login')
const { logout } = require('./controllers/logout')
const usersCtrl = require('./controllers/users')
const notesCtrl = require('./controllers/notes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)

// Auth routes
app.post('/api/login', login)
app.delete('/api/logout', sessionValidator, logout)

// Users routes
app.get('/api/users', usersCtrl.getAll)
app.post('/api/users', usersCtrl.create)

// Notes routes - all require valid session
app.get('/api/notes', notesCtrl.getAll)
app.post('/api/notes', sessionValidator, notesCtrl.create)
app.put('/api/notes/:id', sessionValidator, notesCtrl.update)
app.delete('/api/notes/:id', sessionValidator, notesCtrl.remove)

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err)
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.errors.map(e => e.message).join(', ') })
  }
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: 'Username already taken' })
  }
  res.status(500).json({ error: 'Internal server error' })
})

const start = async () => {
  await sequelize.authenticate()
  console.log('Database connected')
  await runMigrations()
  console.log('Migrations applied')

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

start().catch(err => {
  console.error('Failed to start:', err)
  process.exit(1)
})
