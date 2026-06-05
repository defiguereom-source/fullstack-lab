const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Session } = require('../models')

const login = async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ where: { username } })
  const passwordCorrect = user ? await bcrypt.compare(password, user.passwordHash) : false

  if (!user || !passwordCorrect) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  if (user.disabled) {
    return res.status(401).json({ error: 'User account is disabled' })
  }

  const userForToken = { username: user.username, id: user.id }
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '24h' })

  // Store the session in the database
  await Session.create({ token, userId: user.id })

  res.status(200).json({
    token,
    username: user.username,
    name: user.name,
    id: user.id,
  })
}

module.exports = { login }
