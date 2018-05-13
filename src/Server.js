const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')
const pino = require('pino')
const cors = require('cors')
const schema = require('./schema')
const plugins = require('./plugins')

class Server {
  constructor (port = 9000, dev = false) {
    this._server = express()
    this._log = pino()
    this._port = port
    this._dev = dev
    this._setupMiddleware()
    this._setupGraphQL()
    this._setupPlugins()
  }

  _setupMiddleware () {
    this._server.use(bodyParser.json())
    this._server.use(bodyParser.urlencoded({ extended: false }))
    this._server.use(cors())
  }

  _setupGraphQL () {
    this._server.use('/graphql', graphqlExpress({ schema }))
    // If application is in dev environment
    if (this._dev) {
      this._server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
    }
  }

  async _setupPlugins () {
    for (let plugin of await plugins.load()) {
      this._server.use(plugin)
    }
  }

  start () {
    this._server.listen(this._port, err => {
      if (err) throw err
      this._log.info(`Server is now running on port ${this._port}`)
    })
  }

  stop () {
    this._log.info(`Stopping server running on port ${this._port}`)
    return this._server.close()
  }
}

module.exports = Server
