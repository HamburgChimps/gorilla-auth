const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
// const mocks = require('./mocks')
const resolvers = require('./resolvers')
const {
  Query,
  User,
  Group,
  Grant,
  Token,
  Mutation
} = require('./types')

const schema = makeExecutableSchema({
  typeDefs: [
    Query,
    User,
    Group,
    Grant,
    Token,
    Mutation
  ], resolvers
})

// addMockFunctionsToSchema({ schema, mocks })

module.exports = schema
