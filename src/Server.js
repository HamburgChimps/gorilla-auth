const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')
const cors = require('cors')
const schema = require('./schema')
const { AuthRouter } = require('./controllers')
const plugins = require('../plugins')
console.log(plugins)

class Server {
  constructor (port = 9000, dev = false) {
    this._server = express()
    this._port = port
    this._dev = dev
    this._setupMiddleware()
    this._setupGraphQL()
    this._setupAuthEndpoints()
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

  _setupAuthEndpoints () {
    this._server.use('/auth', new AuthRouter())
  }

  _setupPlugins () {
    for (let plugin of plugins) {
      this._server.use('/', plugin)
    }
  }

  start () {
    this._server.listen(this._port, err => {
      if (err) throw err
      console.log(`Server is now running on port ${this._port}`)
    })
  }

  stop () {
    return this._server.close()
  }
}

module.exports = Server
