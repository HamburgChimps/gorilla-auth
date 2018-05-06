'use strict'
const { Router } = require('express')
const { createApolloFetch } = require('apollo-fetch')

class Cybus extends Router {
  constructor (graphqlUri) {
    super()
    this._client = createApolloFetch({ uri: graphqlUri })

    this.get('/api/grantees', (req, res) => {
      res.status(200).send({ msg: 'Route setup' })
    })

    this.post('/api/grantees', (req, res) => {
      res.status(200).send({ msg: 'Route setup' })
    })

    this.delete('/api/grantees/:id', (req, res) => {
      res.status(200).send({ msg: 'Route setup' })
    })

    this.put('/api/grantees/:id', (req, res) => {
      res.status(200).send({ msg: 'Route setup' })
    })

    this.post('/api/auth', (req, res) => {
      res.status(200).send({ msg: 'Route setup' })
    })
  }
}

module.exports = Cybus
