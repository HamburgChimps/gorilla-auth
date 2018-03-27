const bcrypt = require('bcrypt')
const { User, Group } = require('../models')

class UserConnect {
  async create (data) {
    const { namespace, name, password, groups } = args
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

  read (query) {
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
module.exports = UserConnect
