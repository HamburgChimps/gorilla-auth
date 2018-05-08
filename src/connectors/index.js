const GrantConnector = require('./Grant')
const GroupConnector = require('./Group')
const TokenConnector = require('./Token')
const UserConnector = require('./User')
const AuthConnector = require('./Auth')
const models = require('./models')

module.exports = {
  grant: new GrantConnector(),
  group: new GroupConnector(),
  token: new TokenConnector(),
  user: new UserConnector(),
  auth: new AuthConnector(),
  __: {
    models
  }
}
