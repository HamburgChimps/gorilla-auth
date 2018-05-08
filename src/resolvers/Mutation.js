const {
  user,
  group,
  auth
} = require('../connectors')

const Mutation = {
  async createUser (root, args) {
    console.log(user)
    return user.create({ root, args })
  },
  async createGroup (root, args) {
    return group.create({ root, args })
  },
  login (root, args) {
    return auth.authenticateUserWithPassword(args)
  },
  async loginIntoMqtt (root, args) {
    const authenticated = await auth.authenticateUserWithPassword(args)
    if (!authenticated) return { result: 'FORBIDDEN' }
    const { isAllowed } = await auth.authorizeMQTTConnect(args)
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
    const { username, topics, namespace } = args
    const authorizedTopics = await auth.authorizeMQTTSubscribe({
      namespace,
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
    const { username, topic, qos, namespace } = args
    const { isAllowed } = await auth.authorizeMQTTPublish({
      namespace,
      name: username,
      mqttGrant: { topic, qos }
    })
    if (isAllowed) return { result: 'ok' }
    else return { result: 'FORBIDDEN' }
  }
}

module.exports = Mutation
