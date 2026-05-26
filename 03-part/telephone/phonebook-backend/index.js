/* =============================
    BACKEND IMPLEMENTATION
=============================== */
require('dotenv').config() 
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

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

/* =========================
   3.1 GET ALL PERSONS
========================= */
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

/* =========================
   3.2 INFO PAGE
========================= */
app.get('/info', (req, res) => {
  Person.countDocuments({}).then(count => {
    const date = new Date()
    res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${date}</p>
    `)
  })
})

/* =========================
   3.3 GET PERSON BY ID
========================= */
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

/* =========================
   3.4 DELETE PERSON
========================= */
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

/* =========================
   3.5 + 3.6 ADD PERSON
========================= */
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

/* =========================
   3.17 UPDATE PERSON
========================= */
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true }
  )
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

/* =========================
   ERROR HANDLER
========================= */
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.code === 11000) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  next(error)
}

app.use(errorHandler)

/* ========================= */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})