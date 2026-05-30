require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 3001


/* =============================
   CONNECTION TO MONGODB
=============================== */

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

  
/* =============================
   GET ALL BLOGS
=============================== */
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => {
      console.error('Error fetching blogs:', error)
      response.status(500).json({ error: 'Internal server error' })
    })
})

/* =============================
    CREATE A NEW BLOG
=============================== */

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => {
      console.error('Error saving blog:', error)
      response.status(400).json({ error: 'Bad request' })
    })
})

/* =============================
    REGISTER A NEW USER
=============================== */
app.post('/api/users', async (req, res) => {
  const { email, password, name } = req.body
  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ email, passwordHash, name })
  const saved = await user.save()
  res.status(201).json(saved)
})

/* =============================
    SIGN IN A USER
=============================== */
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  const valid = user && await bcrypt.compare(password, user.passwordHash)

  if (!valid) {
    return res.status(401).json({ error: 'Credenciales incorrectas' })
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  res.json({ token, email: user.email, name: user.name })
})

/* =============================
    START SERVER
=============================== */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})