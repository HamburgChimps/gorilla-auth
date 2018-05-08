const GrantConnector = require('./Grant')
const GroupConnector = require('./Group')
const TokenConnector = require('./Token')
const UserConnector = require('./User')
const AuthConnector = require('./Auth')
const models = require('./models')

module.exports = {
  GrantConnector,
  GroupConnector,
  TokenConnector,
  UserConnector,
  AuthConnector,
  __: {
    models
  }
}
