const mongoose = require('mongoose')

// User schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: String,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)