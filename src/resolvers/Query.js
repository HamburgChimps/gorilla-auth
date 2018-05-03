const {
  UserConnector,
  GroupConnector,
  GrantConnector,
  TokenConnector,
  AuthConnector
} = require('../connectors')

const userConnector = new UserConnector()
const groupConnector = new GroupConnector()
const grantConnector = new GrantConnector()
const tokenConnector = new TokenConnector()
const authConnector = new AuthConnector()

const Query = {
  user (root, args) {
    return userConnector.read({ root, query: args })
  },
  allUsers () {
    return userConnector.readAll()
  },
  group (root, args) {
    return groupConnector.read({ root, query: args })
  },
  allGroups () {
    return groupConnector.readAll()
  },
  grant (root, args) {
    return grantConnector.read({ root, query: args })
  },
  allGrants () {
    return grantConnector.readAll()
  },
  token (root, args) {
    return tokenConnector.read({ root, query: args })
  },
  allTokens () {
    return tokenConnector.readAll()
  },
  login (root, args) {
    return authConnector.authenticateUserWithPassword(args)
  }
}

module.exports = Query
