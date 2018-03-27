const { Token } = require('../models')

class TokenConnector {
  read (query) {
    return Token.find({ where: query })
  }

  readAll () {
    return Token.findAll()
  }

  owner (token) {
    return token.getUser()
  }
}

module.exports = TokenConnector
