const { Grant } = require('../db')

const Grant = {
  owner (grant) {
    return grant.getGroup()
  }
}
module.exports = Grant
