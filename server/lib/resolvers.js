const resolvers = {
  Query: {
      user(root, args) {
          return {name: args.name, namespace: args.namespace}
          
      },
      allUsers() {
          return [
              { id: 1, namespace: 'system', name: 'admin'},
              { id: 2, namespace: 'tech-1234', name: 'admin'}
          ]
      }
  },
  User: {
      groups(user) {
          return [
              { id: 1, namespace: 'system', name: 'admin' },
              { id: 1, namespace: 'system', name: 'wheel'}
          ]
      },
      tokens(user) {
          return [
              { id: 1, payload: 'qweasdasdwqeqweasdasd'},
              { id: 2, payload: 'ljoujoiukljkjljljlkjk'}
          ]
      }
  },
  Group:{
      grants(group) {
          return [
              { id: 1, permission: 'MQTT_SUBSCRIBE', ressource: '#' },
              { id: 2, permission: 'MQTT_PUBLISH', ressource: '/system/hello' }
          ]
      },
      members() {
          return [
              {}
          ]
      }
  }
}

module.exports = resolvers
