const User = require('./user')
const Note = require('./note')
const Session = require('./session')

User.hasMany(Note, { foreignKey: 'userId' })
Note.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(Session, { foreignKey: 'userId' })
Session.belongsTo(User, { foreignKey: 'userId' })

module.exports = { User, Note, Session }
