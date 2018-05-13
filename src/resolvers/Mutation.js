const {
  user,
  group,
  auth,
  grant
} = require('../connectors')

const Mutation = {
  async createUser (root, args) {
    return user.create({ root, args })
  },
  async createGroup (root, args) {
    return group.create({ root, args })
  },
  login (root, args) {
    const { input } = args
    return auth.authenticateUserWithPassword(input)
  },
  async loginIntoMqtt (root, args) {
    const { input } = args
    const authenticated = await auth.authenticateUserWithPassword(input)
    if (!authenticated) return { result: 'FORBIDDEN' }
    const { isAllowed } = await auth.authorizeMQTTConnect(input)
    if (isAllowed) {
      return {
        result: 'ok',
        modifiers: {
          client_id: input.client_id,
          mountpoint: ''
        }
      }
    } else {
      return { result: 'FORBIDDEN' }
    }
  },
  async subscribeAuth (root, args) {
    const { input } = args
    const { name, topics, namespace } = input
    const allowedTopics = await auth.authorizeMQTTSubscribe({
      namespace,
      name,
      mqttGrants: topics
    })
    const authorizedTopics = allowedTopics.map(({ isAllowed, grant }) => {
      if (!isAllowed) grant.qos = 128
      return grant
    })
    return {
      result: 'ok',
      modifiers: {
        client_id: input.client_id,
        mountpoint: ''
      },
      topics: authorizedTopics
    }
  },
  async publishAuth (root, args) {
    const { input } = args
    const { name, topic, qos, namespace } = input
    const { isAllowed } = await auth.authorizeMQTTPublish({
      namespace,
      name,
      mqttGrant: { topic, qos }
    })
    if (isAllowed) return {
      result: 'ok',
      modifiers: {
        client_id: input.client_id,
        mountpoint: ''
      }
    }
    else return { result: 'FORBIDDEN' }
  },
  async createMQTTGrant (root, args) {
    const { input } = args
    const mqttGrant = await grant.createMQTTGrant(input)
    return mqttGrant
  },
  async createAPIGrant (root, args) {
    const { input } = args
    const mqttGrant = await grant.createAPIGrant(input)
    return mqttGrant
  }
}

module.exports = Mutation
