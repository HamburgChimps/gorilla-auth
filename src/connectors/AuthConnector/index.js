const bcrypt = require('bcrypt')
const Op = require('sequelize').Op;
const { User, Grant, Group } = require('../models')
const mqttRegexBuilder = require( 'mqtt-regex-builder' )


class AuthConnector {
  async authenticateUserWithPassword ({ namespace, name, password }) {
    try {
      let authenticated = false
      const user = await User.findOne({ where: { namespace, name } })
      authenticated = await bcrypt.compare(password, user.encrypted_password)
      return authenticated
    } catch (err) {
      console.log(err)
    }
  }

  async authorizeMQTTConnect({ namespace, name}) {
    const userGrants = await Grant.findAll({
      where: {
        grant_type: 'MQTT',
        data: { permission: 'CONNECT' }
      },
      include: [{
        model: Group,
        required: true,
        include: [{
          model: User,
          as: 'members',
          required: true,
          where: { namespace, name }
        }]
      }]
    })
    if (userGrants.length > 0) {
      return { isAllowed: true }
    }
    return { isAllowed: false }
  }

  async authorizeMQTTSubscribe({ namespace, name, mqttGrants }) {
    const userGrants = await Grant.findAll({
      where: {
        grant_type: 'MQTT',
        data: { permission: 'SUBSCRIBE' }
      },
      include: [{
        model: Group,
        required: true,
        include: [{
          model: User,
          as: 'members',
          required: true,
          where: { namespace, name }
        }]
      }]
    })
    
    return mqttGrants.map((grant) => {
      const grantFound = userGrants.find((userGrant) => {
        if (userGrant.data.topic === grant.topic) {
          return true
        }
        const topicRegex = mqttRegexBuilder(userGrant.data.topic)
        const match = topicRegex.exec(grant.topic)
        if (match && match.length > 0) {
          return true
        }
      })
      if (grantFound) {
        return { isAllowed: true, grant }
      }
      return { isAllowed: false, grant }
    })
  }
  async authorizeMQTTPublish({ namespace, name, mqttGrant }) {
    const userGrants = await Grant.findAll({
      where: {
        grant_type: 'MQTT',
        data: { permission: 'PUBLISH' }
      },
      include: [{
        model: Group,
        required: true,
        include: [{
          model: User,
          as: 'members',
          required: true,
          where: { namespace, name }
        }]
      }]
    })
    const grantFound = userGrants.find((userGrant) => {
      if (userGrant.data.topic === mqttGrant.topic) {
        return true
      }
      const topicRegex = mqttRegexBuilder(userGrant.data.topic)
      const match = topicRegex.exec(mqttGrant.topic)
      if (match && match.length > 0) {
        return true
      }
    })
    if (grantFound) {
      return { isAllowed: true, mqttGrant }
    }
    return { isAllowed: false, mqttGrant }
  }
}
module.exports = AuthConnector
