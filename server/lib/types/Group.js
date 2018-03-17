const Group = `
type Group {
  id: Int
  namespace: String
  name: String
  grants: [Grant]
  members: [User]
}`

module.exports = Group
