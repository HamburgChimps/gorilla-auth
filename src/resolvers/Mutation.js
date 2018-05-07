const {
  UserConnector,
  GroupConnector,
  AuthConnector
} = require('../connectors')
const authConnector = new AuthConnector()

const Mutation = {
  async createUser (root, args) {
    return UserConnector.create({ root, args })
  },
  async createGroup (root, args) {
    return GroupConnector.create({ root, args })
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
  },
  async subscribeAuth (root, args) {
    const { username, topics } = args
    const authorizedTopics = await authConnector.authorizeMQTTSubscribe({
      namespace: 'system',
      name: username,
      mqttGrants: topics
    }).map(({ isAllowed, grant }) => {
      if (!isAllowed) grant.qos = 128
      return grant
    })
    return {
      result: 'ok',
      topics: authorizedTopics
    }
  },
  async publishAuth (root, args) {
    const { username, topic, qos } = args
    const { isAllowed } = await authConnector.authorizeMQTTPublish({
      namespace: 'system',
      name: username,
      mqttGrant: { topic, qos }
    })
    if (isAllowed) return { result: 'ok' }
    else return { result: 'FORBIDDEN' }
  }
}

module.exports = Mutation
