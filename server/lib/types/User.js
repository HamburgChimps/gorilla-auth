const User = `
type User {
  id: Int!
  namespace: String!
  name: String!
  groups: [Group]
  tokens: [Token]
}`

module.exports = User
