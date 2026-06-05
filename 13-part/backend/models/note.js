const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Note extends Model {}

Note.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    important: { type: DataTypes.BOOLEAN, defaultValue: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'note',
    timestamps: true,
  }
)

module.exports = Note
