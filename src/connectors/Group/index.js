const { Group } = require('../models')

class GroupConnector {
  async create ({ root, args: { input } }) {
    return Group.create(input)
  }

  read ({ root, query }) {
    return Group.find({ where: query })
  }

  readAll () {
    return Group.findAll()
  }

  grants (group) {
    return group.getGrants()
  }

  members (group) {
    return group.getMembers()
  }
}

module.exports = GroupConnector
