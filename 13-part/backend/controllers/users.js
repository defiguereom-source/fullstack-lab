const bcrypt = require('bcrypt')
const { User, Note } = require('../models')

const getAll = async (_req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'username', 'name', 'disabled'],
    include: [{ model: Note, attributes: ['id', 'content', 'important'] }],
  })
  res.json(users)
}

const create = async (req, res) => {
  const { username, name, password } = req.body

  if (!password || password.length < 3) {
    return res.status(400).json({ error: 'Password must be at least 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await User.create({ username, name, passwordHash })
  res.status(201).json({ id: user.id, username: user.username, name: user.name })
}

module.exports = { getAll, create }
