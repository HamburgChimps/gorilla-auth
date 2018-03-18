const Token = {
  owner (token) {
    return token.getUser()
  }
}
module.exports = Token