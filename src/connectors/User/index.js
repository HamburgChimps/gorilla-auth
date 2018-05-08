const bcrypt = require('bcrypt')
const { User, Group } = require('../models')

class UserConnector {
  async create ({ root, args: { input } }) {
    const { namespace, name, password, groups } = input
    const encrypted_password = await bcrypt.hash(password, 12)
    const newUser = await User.create({ namespace, name, encrypted_password })
    await Group.findOrCreate({
      where: {
        namespace,
        name
      }
    }).spread((group, created) => {
      return newUser.addGroup(group)
    })
    return newUser
  }

  read ({ root, query }) {
    return User.find({ where: query })
  }

  readAll () {
    return User.findAll()
  }

  groups (user) {
    return user.getGroups()
  }

  tokens (user) {
    return user.getTokens()
  }
}
module.exports = UserConnector
