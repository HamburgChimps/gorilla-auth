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
  async authorize({ namespace, name, grant }) {
    const { grant_type, data } = grant
    const grants = await Grant.findAll({
      where: {
        grant_type,
        data
      },
      include: [{
        model: Group,
        include: [{
          model: User,
          as: 'members',
          where: { namespace, name }
        }]
      }]
    })
    return grants.length >= 1
  }
}
module.exports = AuthConnector
