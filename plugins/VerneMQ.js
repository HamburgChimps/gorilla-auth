'use strict'
const { Router } = require('express')
const { createApolloFetch } = require('apollo-fetch')

class Cybus extends Router {
  constructor (graphqlUri) {
    super()
    const client = createApolloFetch({ uri: graphqlUri })

    this.post('/broker/auth_on_register', async (req, res) => {
      const { username, password, client_id } = req.body
      const query = `
      {
        loginIntoMqtt(
          namespace: "system",
          name: "${username}",
          password: "${password}",
          client_id: "${client_id}"
        ) {
          result
          modifiers {
            client_id
            mountpoint
          }
        }
      }
      `
      const { data, errors } = await client({ query })
      if (errors) res.status(200).send({ msg: 'Error not able to authenticate', errors })
      else res.status(200).send(data)
    })
  }
}

module.exports = Cybus
