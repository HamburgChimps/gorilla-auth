const { User } = require('../connector')

const Group = {
  grants (group) {
    return group.getGrants()
  },
  members (group) {
    return group.getMembers()
  }
}

module.exports = Group
