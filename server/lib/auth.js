'use strict'
const { Router } = require('express')
const { authenticateUserWithPassword } = require('./connector')

function AuthRouter () {
  const authRouter = new Router()

  authRouter.get('/test', async (req, res) => {
    res.send(200, 'OK')
  })

  authRouter.post('/broker/auth_on_register', async (req, res) => {
    try {
      const {username, password} = req.body
      console.log(username, password)
      let authenticated = false
      authenticated = await authenticateUserWithPassword({
        namespace: 'system',
        name: username,
        password
      })
      if (authenticated) res.status(200).send({ result: 'OK' })
      res.status(200).send({ result: { error: 'FORBIDDEN' }})
    } catch (err) {
      console.log(err)
      res.send(err)
    }
  })

  authRouter.post('/broker/auth_on_subscribe', async (req, res) => {
    try {
      const {username, client_id, topics} = req.body
      console.log(username, client_id)
      console.log(topics)
      res.status(200).send({ result:'OK' })
    } catch (err) {
      console.log(err)
      res.send(err)
    }
  })

  authRouter.post('/broker/auth_on_publish', async (req, res) => {
    try {
      const {username, client_id, topic} = req.body
      console.log(username, client_id)
      console.log(topic)
      res.status(200).send({ result: 'OK' })
    } catch (err) {
      console.log(err)
      res.send(err)
    }
  })
  return authRouter
}

module.exports = AuthRouter