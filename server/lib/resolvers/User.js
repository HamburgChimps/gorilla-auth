const User = {
  groups (user) {
    return [
      { id: 1, namespace: 'system', name: 'admin' },
      { id: 1, namespace: 'system', name: 'wheel' }
    ]
  },
  tokens (user) {
    return [
      { id: 1, payload: 'qweasdasdwqeqweasdasd' },
      { id: 2, payload: 'ljoujoiukljkjljljlkjk' }
    ]
  }
}

module.exports = User
