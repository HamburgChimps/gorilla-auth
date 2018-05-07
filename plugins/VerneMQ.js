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
      mutation {
        loginIntoMqtt(input: {
          namespace: "system",
          name: "${username}",
          password: "${password}",
          client_id: "${client_id}"
        }) {
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

    this.post('/broker/auth_on_subscribe', async (req, res) => {
      const { username, topics } = req.body
      const query = `
      mutation {
        subscribeAuth(input: {
          username: ${username}
          topics: ${topics}
        }) {
          result
          topics
        }
      }
      `
      const { data, errors } = await client({ query })
      if (errors) res.status(200).send({ msg: 'Error not able to authenticate', errors })
      else res.status(200).send(data)
    })

    this.post('/broker/auth_on_publish', async (req, res) => {
      const { username, topic, qos } = req.body
      const query = `
      mutation {
        publishAuth(input: {
          username: ${username}
          topic: ${topic},
          qos: ${qos}
        }) {
          result
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
