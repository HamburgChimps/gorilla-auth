

const Mutation =  `
type Mutation {
  createUser(namespace: String!, name: String!): User
  createGroup(namespace: String!, name: String!): User
}
`

module.exports = Mutation