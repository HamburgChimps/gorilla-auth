const Query = `
type Query {
  user(namespace: String, name: String): User
  allUsers: [User]

  group(namespace: String, name: String): Group
  allGroups: [Group]

  grant(id: Int): Grant
  allGrants: [Grant]

  token(id: Int): Token
  allTokens: [Token]
}
`
module.exports = Query