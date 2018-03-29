const { UserConnector, GroupConnector } = require('../connectors')

const Mutation = {
  async createUser (root, args) {
    return UserConnector.create({ root, args })
  },
  async createGroup (root, args) {
    return GroupConnector.create({ root, args })
  }
}
module.exports = Mutation
