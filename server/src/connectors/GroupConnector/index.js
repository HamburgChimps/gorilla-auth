const { Group } = require('../models')

class GroupConnector {
  async create ({ root, args }) {
    return Group.create(args)
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
