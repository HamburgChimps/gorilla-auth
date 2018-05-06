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
  },
  async loginIntoMqtt (root, args) {
    const authenticated = await authConnector.authenticateUserWithPassword(args)
    if (!authenticated) return { result: 'FORBIDDEN' }
    const { isAllowed } = await authConnector.authorizeMQTTConnect(args)
    if (isAllowed) {
      return {
        result: 'ok',
        modifiers: {
          client_id: args.client_id,
          mountpoint: ''
        }
      }
    } else {
      return { result: 'FORBIDDEN' }
    }
  }
}

module.exports = Query
