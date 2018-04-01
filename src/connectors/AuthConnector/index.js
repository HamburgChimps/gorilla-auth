const bcrypt = require('bcrypt')
const Op = require('sequelize').Op;
const { User, Grant, Group } = require('../models')


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
  async authorize({ namespace, user, grant }) {
    const { permission, resource } = grant
    const grants = await Grant.findAll({
      where: {
        grouId: {
          [Op.in]: []
        },
        permission: permission,
        resource: {
          [Op.like]: resource
        }
      }
    })
  }
}
module.exports = AuthConnector
