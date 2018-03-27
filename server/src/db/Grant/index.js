const { Grant } = require('../models')

class GrantConnector {
  read (query) {
    return Grant.find({ where: query })
  }

  readAll () {
    return Grant.findAll()
  }

  owner (grant) {
    return grant.getGroup()
  }
}

module.exports = GrantConnector
