const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Session extends Model {}

Session.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    token: { type: DataTypes.STRING(512), unique: true, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'session',
    timestamps: true,
  }
)

module.exports = Session
