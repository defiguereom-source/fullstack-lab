const path = require('path')
const { Umzug, SequelizeStorage } = require('umzug')
const { sequelize } = require('./db')

const migrationConf = {
  migrations: {
   glob: ['migrations/*.js', { cwd: path.join(__dirname, '..') }],
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations run:', migrations.map(m => m.name))
}

const rollbackMigration = async () => {
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

module.exports = { runMigrations, rollbackMigration }
