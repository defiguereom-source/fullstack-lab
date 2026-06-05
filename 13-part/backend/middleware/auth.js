const jwt = require('jsonwebtoken')
const { Session, User } = require('../models')

const tokenExtractor = (req, _res, next) => {
  const authorization = req.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

const sessionValidator = async (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: 'Token missing' })
  }

  let decodedToken
  try {
    decodedToken = jwt.verify(req.token, process.env.SECRET)
  } catch {
    return res.status(401).json({ error: 'Token invalid or expired' })
  }

  // Verify the session exists in the database (server-side session check)
  const session = await Session.findOne({ where: { token: req.token } })
  if (!session) {
    return res.status(401).json({ error: 'Session expired or logged out' })
  }

  // Verify the user is not disabled
  const user = await User.findByPk(decodedToken.id)
  if (!user) {
    return res.status(401).json({ error: 'User not found' })
  }
  if (user.disabled) {
    // Also destroy the session since user is disabled
    await session.destroy()
    return res.status(401).json({ error: 'User account is disabled' })
  }

  req.decodedToken = decodedToken
  req.user = user
  next()
}

module.exports = { tokenExtractor, sessionValidator }
