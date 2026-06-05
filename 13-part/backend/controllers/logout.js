const { Session } = require('../models')

const logout = async (req, res) => {
  // req.token is set by tokenExtractor middleware
  const deleted = await Session.destroy({ where: { token: req.token } })
  if (deleted === 0) {
    return res.status(404).json({ error: 'Session not found' })
  }
  res.status(204).end()
}

module.exports = { logout }
