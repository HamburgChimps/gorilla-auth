const Query = {
  user (root, args) {
    return {name: args.name, namespace: args.namespace}
  },
  allUsers () {
    return [
      { id: 1, namespace: 'system', name: 'admin' },
      { id: 2, namespace: 'tech-1234', name: 'admin' }
    ]
  }
}

module.exports = Query
