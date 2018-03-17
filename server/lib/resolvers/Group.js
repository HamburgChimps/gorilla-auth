const Group = {
  grants (group) {
    return [
      { id: 1, permission: 'MQTT_SUBSCRIBE', ressource: '#' },
      { id: 2, permission: 'MQTT_PUBLISH', ressource: '/system/hello' }
    ]
  },
  members () {
    return [
      {}
    ]
  }
}

module.exports = Group
