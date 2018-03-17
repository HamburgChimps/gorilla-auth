const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const mocks = require('./mocks')
const { Grant, Group, Token, User } = require('./types')

const typeDefs = `
type Query {
  users(namespace: String, name: String): User
  userById(id: Int): User
  allUsers: [User]

  group(namespace: String, name: String): Group
  groupById(id: Int): Group
  allGroups: [Group]

  grant(id: Int): Grant
  allGrants: [Grant]

  token(id: Int): Token
  allTokens: [Token]
}
`

const schema = makeExecutableSchema({ typeDefs: [typeDefs, Grant, Group, Token, User] })

addMockFunctionsToSchema({ schema, mocks })

module.exports = schema
