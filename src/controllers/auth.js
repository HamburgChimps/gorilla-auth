'use strict'
const { Router } = require('express')
const { authenticateUserWithPassword } = require('../connectors')

class AuthRouter extends Router {
  constructor () {
    super()

    this.get('/test', async (req, res) => {
      res.status(200).send({ msg: 'OK' })
    })

    this.post('/broker/auth_on_register', async (req, res) => {
      try {
        const {username, password} = req.body
        let authenticated = false
        authenticated = await authenticateUserWithPassword({
          namespace: 'system',
          name: username,
          password
        })
        if (authenticated) res.status(200).send({ result: 'OK' })
        res.status(200).send({ result: { error: 'FORBIDDEN' } })
      } catch (err) {
        console.log(err)
        res.status(200).send({ msg: 'Error not able to authenticate', err })
      }
    })

    this.post('/broker/auth_on_subscribe', async (req, res) => {
      try {
        const { username, client_id, topics } = req.body
        console.log(username, client_id)
        console.log(topics)
        res.status(200).send({ result: 'OK' })
      } catch (err) {
        console.log(err)
        res.status(200).send({ msg: 'Error not able to authenticate', err })
      }
    })

    this.post('/broker/auth_on_publish', async (req, res) => {
      try {
        const {username, client_id, topic} = req.body
        console.log(username, client_id)
        console.log(topic)
        res.status(200).send({ result: 'OK' })
      } catch (err) {
        console.log(err)
        res.status(200).send({ msg: 'Error not able to authenticate', err })
      }
    })
  }
}

module.exports = AuthRouter
