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
      console.log('on_register')
      try {
        const { username, password, client_id } = req.body
        let authenticated = false
        authenticated = await authConnector.authenticateUserWithPassword({
          namespace: 'system',
          name: username,
          password
        })
        if (authenticated) {
          const { isAllowed } = await authConnector.authorizeMQTTConnect({
            namespace: 'system',
            name: username
          })
          if (isAllowed) {
            res.status(200).send({
              result: 'ok',
              modifiers: {
                client_id,
                mountpoint: ''
              }
            })
            console.log('authorized')
            return
          }
        }
        res.status(200).send({ result: { error: 'FORBIDDEN' } })
        console.log('FORBIDDEN')
      } catch (err) {
        console.log(err)
        res.status(200).send({ msg: 'Error not able to authenticate', err })
      }
    })

    this.post('/broker/auth_on_subscribe', async (req, res) => {
      console.log('subscribe')
      try {
        const { username, client_id, topics } = req.body
        console.log(req.body)
        const authorizedTopics = await authConnector.authorizeMQTTSubscribe({
          namespace: 'system',
          name: username,
          mqttGrants: topics
        })
        if (authorizedTopics.length > 0) {
          const topics = authorizedTopics.map(({isAllowed, grant}) => {
            if (!isAllowed) {
              grant.qos = 128
            }
            return grant
          })
          res.status(200).send({ result: 'ok' , topics})
          console.log('authorized')
          return
        }
        res.status(200).send({ result: { error: 'FORBIDDEN' } })
        console.log('FORBIDDEN')
      } catch (err) {
        console.log(err)
        res.status(200).send({ msg: 'Error not able to authenticate', err })
      }
    })

    this.post('/broker/auth_on_publish', async (req, res) => {
      console.log('publish')
      try {
        const {username, client_id, topic, qos} = req.body
        const { isAllowed } = await authConnector.authorizeMQTTPublish({
          namespace: 'system',
          name: username,
          mqttGrant: { topic, qos }
        })
        if (isAllowed) {
          res.status(200).send({ result: 'ok' })
          console.log('authorized')
          return
        }
        res.status(200).send({ result: { error: 'FORBIDDEN' } })
        console.log('FORBIDDEN')
      } catch (err) {
        console.log(err)
        res.status(200).send({ msg: 'Error not able to authenticate', err })
      }
    })
  }
}

module.exports = AuthRouter
