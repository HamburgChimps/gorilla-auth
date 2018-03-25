/* global describe, it */
var { assert } = require('chai')
const Server = require('../../src/Server')

describe('Server Class', () => {
  const server = new Server()

  it('should be an object', () => {
    assert.isObject(server)
  })

  it('should have the correct interface methods', () => {
    assert.isFunction(server.start)
    assert.isFunction(server.stop)
  })
})
