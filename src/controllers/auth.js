'use strict'
const { Router } = require('express')
const { AuthConnector } = require('../connectors')
const authConnector = new AuthConnector()

class AuthRouter extends Router {  
  constructor () {
    super()

    this.get('/test', async (req, res) => {
      res.status(200).send({ msg: 'OK' })
    })

    this.post('/broker/auth_on_register', async (req, res) => {
      try {
        const { username, password } = req.body
        let authenticated = false
        authenticated = await authConnector.authenticateUserWithPassword({
          namespace: 'system',
          name: username,
          password
        })
        if (authenticated) {
          const authorized = await authConnector.authorizeMQTTConnect({
            namespace: 'system',
            name: username,
          })
          if (authorized) res.status(200).send({ result: 'OK' })
        }
        res.status(200).send({ result: { error: 'FORBIDDEN' } })
      } catch (err) {
        console.log(err)
        res.status(200).send({ msg: 'Error not able to authenticate', err })
      }
    })

    this.post('/broker/auth_on_subscribe', async (req, res) => {
      try {
        const { username, client_id, topics } = req.body
        const authorized = authConnector.authorizeMQTTSubscribe({
          namespace: 'system',
          name: username,
          mqttGrants: topics
        })
        if (authorized) res.status(200).send({ result: 'OK' })
        res.status(200).send({ error: 'FORBIDDEN' })
      } catch (err) {
        console.log(err)
        res.status(200).send({ msg: 'Error not able to authenticate', err })
      }
    })

    this.post('/broker/auth_on_publish', async (req, res) => {
      try {
        const {username, client_id, topic} = req.body
        const authorized = authConnector.authorizeMQTTPublish({
          namespace: 'system',
          name: username,
          mqttGrant: topic
        })
        if (authorized) res.status(200).send({ result: 'OK' })
        res.status(200).send({ error: 'FORBIDDEN' })
      } catch (err) {
        console.log(err)
        res.status(200).send({ msg: 'Error not able to authenticate', err })
      }
    })
  }
}

module.exports = AuthRouter
