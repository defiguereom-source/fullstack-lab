require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

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
    START SERVER
=============================== */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})