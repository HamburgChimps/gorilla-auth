const { Group } = require('../models')

class GroupConnector {
  create (data) {
    return Group.create(data)
  }

  read (query) {
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
