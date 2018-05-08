const {
  user,
  group,
  grant,
  token
} = require('../connectors')

const Query = {
  user (root, args) {
    return user.read({ root, query: args })
  },
  allUsers () {
    return user.readAll()
  },
  group (root, args) {
    return group.read({ root, query: args })
  },
  allGroups () {
    return group.readAll()
  },
  grant (root, args) {
    return grant.read({ root, query: args })
  },
  allGrants () {
    return grant.readAll()
  },
  token (root, args) {
    return token.read({ root, query: args })
  },
  allTokens () {
    return token.readAll()
  }
}

module.exports = Query
