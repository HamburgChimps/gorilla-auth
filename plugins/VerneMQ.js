'use strict'
const { Router } = require('express')
const { createApolloFetch } = require('apollo-fetch')

class Cybus extends Router {
  constructor (graphqlUri) {
    super()
    const client = createApolloFetch({ uri: graphqlUri })

    this.post('/broker/auth_on_register', async (req, res) => {
      const { username, password, client_id } = req.body
      try {
        const authenticated = await login({ client, username, password })
        if (!authenticated) res.status(200).send({ result: { error: 'FORBIDDEN' } })
        res.status(200).send({ msg: 'Route setup' })
      } catch (err) {
        res.status(200).send({ msg: 'Error not able to authenticate', err })
      }
    })
  }
}

async function login ({
  client,
  username,
  password
}) {
  const query = `
  {
    login(namespace: "system", name: "${username}", password: "${password}")
  }
  `
  const { data, errors } = await client({ query })
  if (errors) throw errors
  return data
}

module.exports = Cybus
