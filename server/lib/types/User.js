const User = `
type User {
  id: Int
  namespace: String
  name: String
  password: String
  groups: [Group]
  tokens: [Token]
}`

module.exports = User
