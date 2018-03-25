const { User, Group, Grant, Token } = require('../db')

const Query = {
  user (root, args) {
    return User.find({ where: args })
  },
  allUsers () {
    return User.findAll()
  },
  group (root, args) {
    return Group.find({ where: args })
  },
  allGroups () {
    return Group.findAll()
  },
  grant (root, args) {
    return Grant.find({ where: args })
  },
  allGrants () {
    return Grant.findAll()
  },
  token (root, args) {
    return Token.find({ where: args })
  },
  allTokens () {
    return Token.findAll()
  }
}

module.exports = Query
