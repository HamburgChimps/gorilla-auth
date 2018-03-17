const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')
const cors = require('cors')

class Server {
  constructor (port = 9000, dev = false) {
    this._server = express()
    this._port = port
    this._dev = dev
    this.setupMiddleware()
    this.setupGraphQL()
  }

  setupMiddleware () {
    this._server.use(bodyParser.json())
    this._server.use(bodyParser.urlencoded({extended: false}))
    this._server.use(cors())
  }

  setupGraphQL () {
    this._server.use('/graphql', graphqlExpress({}>))
    // If application is in dev environment
    if (this._dev) {
      this._server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphiql' }))
    }
  }

  start () {
    this._server.listen(this._port, err => {
      if (err) throw err
      console.log(`Server is now running on port ${this._port}`)
    })
  }
}

module.exports = Server
