const { Grant, Group } = require('../models')

class GrantConnector {
  read ({ root, query }) {
    return Grant.find({ where: query })
  }

  readAll () {
    return Grant.findAll()
  }

  async createMQTTGrant ({ namespace, name, permission, topic }) {
    if (permission !== 'CONNECT' && !topic) {
      throw new Error('topic missing')
    }
    const group = await Group.findOne({ where: { namespace, name } })
    if (group) {
      const mqttGrant = await group.createGrant({
        grant_type: 'MQTT',
        data: {
          permission,
          topic
        }
      })
      return { grant_type: mqttGrant.grant_type, permission: mqttGrant.data.permission, topic: mqttGrant.data.topic }
    }
  }

  async createAPIGrant ({ namespace, name, permission, resource }) {
    if (!resource) {
      throw new Error('resource missing')
    }
    const group = await Group.findOne({ where: { namespace, name } })
    if (group) {
      const apiGrant = await group.createGrant({
        grant_type: 'API',
        data: {
          permission,
          resource
        }
      })
      return { grant_type: apiGrant.grant_type, permission: apiGrant.data.permission, resource: apiGrant.data.resource }
    }
  }

  owner (grant) {
    return grant.getGroup()
  }
}

module.exports = GrantConnector
