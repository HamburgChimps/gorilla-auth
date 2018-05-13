const Grant = {
  owner (grant) {
    return grant.getGroup()
  },
  permission (grant) {
    return grant.data.permission
  },
  resource (grant) {
    if (grant.grant_type === 'MQTT') {
      return grant.data.topic
    }
  }
}

module.exports = Grant
