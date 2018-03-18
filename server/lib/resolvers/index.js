const Query = require('./Query')
const User = require('./User')
const Group = require('./Group')
const Grant = require('./Grant')
const Token = require('./Token')
const Mutation = require('./Mutation')

const resolvers = {
  Query,
  User,
  Group,
  Grant,
  Token,
  Mutation
}

module.exports = resolvers
