
const systemAdmin = {
  id: 1,
  namespace: 'system', 
  name: 'admin',
  password: 'admin',
  groups: [1],
  tokens: [1, 2]
}

const techAdmin = {
  id: 1,
  namespace: 'tech-1234', 
  name: 'admin',
  password: 'admin',
  groups: [2],
  tokens: []
}

const users = {
  1: systemAdmin,
  2: techAdmin
}


const mocks = {
  Query: () => ({
      userById: (root, args) => {
          return users[args.id]
          
      },
      allUsers: () => {
          return [
              { id: 1, namespace: 'system', name: 'admin'},
              { id: 2, namespace: 'tech-1234', name: 'admin'}
          ]
      },
  }),
  User: () => ({
      groups: (user) => {
          return [
              { id: 1, namespace: 'system', name: 'admin' },
              { id: 1, namespace: 'system', name: 'wheel'}
          ]
      },
      tokens: (user) => {
          return [
              { id: 1, payload: 'qweasdasdwqeqweasdasd'},
              { id: 2, payload: 'ljoujoiukljkjljljlkjk'}
          ]
      }
  }),
  Group: () => ({
      grants: (group) => {
          return [
              { id: 1, permission: 'MQTT_SUBSCRIBE', ressource: '#' },
              { id: 2, permission: 'MQTT_PUBLISH', ressource: '/system/hello' }
          ]
      },
      members: () => {
          return [
              {}
          ]
      }
  })
}

module.export = mocks
