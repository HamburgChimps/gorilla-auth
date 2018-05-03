'use strict'
const { Router } = require('express')
const { createApolloFetch } = require('apollo-fetch')

class Cybus extends Router {
  constructor (graphqlUri) {
    super()
    this._client = createApolloFetch({ uri: graphqlUri })
    this._setupRoutes()
  }

  _setupRoutes() {
    this.get()
  }
}

module.exports = Cybus
