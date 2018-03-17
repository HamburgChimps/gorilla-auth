const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const mocks = require('./mocks')

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

type User {
  id: Int
  namespace: String
  name: String
  password: String
  groups: [Group]
  tokens: [Token]
}

type Group {
  id: Int
  namespace: String
  name: String
  grants: [Grant]
  members: [User]
}

type Grant {
  id: Int
  owner: Group
  permission: String
  ressource: String
}

type Token {
  id: Int
  owner: User
  payload: String
  creationDate: String
  experitionDate: String
}
`

const schema = makeExecutableSchema({
  typeDefs
})

addMockFunctionsToSchema({ schema, mocks })

module.exports = schema
