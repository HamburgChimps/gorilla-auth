const User = {
  groups (user) {
    return user.getGroups()
  },
  tokens (user) {
    return user.getTokens()
  }
}

module.exports = User
