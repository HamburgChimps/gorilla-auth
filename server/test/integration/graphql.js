'use strict'
/* global describe, it, after*/
const { assert } = require('chai')
const axios = require('axios')
const { createApolloFetch } = require('apollo-fetch')
const Server = require('../../src/Server')

const domain = 'http://localhost:9000'

describe('Server graphql queries', () => {
  const server = new Server()
  server.start()

  const uri = 'http://localhost:9000/graphql'
  const apolloFetch = createApolloFetch({ uri })

  describe('Tool holder', () => {
    it('should create a new user', async () => {
      const query = `
      mutation {
        createUser(namespace: "test_name_space", name: "test") {
          id
          namespace
          name
        }
      }
      `
      const { data, errors, extensions } = await apolloFetch({ query })
      console.log(data)
    })
  })

  after(() => server.stop())
})
