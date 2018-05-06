'use strict'
const { Router } = require('express')
const { createApolloFetch } = require('apollo-fetch')

class Cybus extends Router {
  constructor (graphqlUri) {
    super()
    this._client = createApolloFetch({ uri: graphqlUri })

    this.get('/api/auth', (req, res) => {
      res.status(200).send({ msg: 'Route setup' })
    })
  }
}

module.exports = Cybus
