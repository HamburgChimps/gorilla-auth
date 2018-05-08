const { Sequelize } = require('sequelize')

class Postgres extends Sequelize {
  static init (config = {}) {
    if (!Postgres._instance) {
      Postgres._instance = new Postgres(config)
    }
    return Postgres._instance
  }

  constructor ({ dbName = 'db', username = 'user', password = 'password' }) {
    super(`postgres://${username}:${password}@db/${dbName}`)
    this.sync()
  }
}

module.exports = Postgres
