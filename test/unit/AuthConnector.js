
/* global describe, it , before */
var { assert } = require('chai')
const { AuthConnector , __ } = require('../../src/connectors')

describe.only('AuthConnector', () => {
  const authConnector = new AuthConnector()
  before(async () => {
    await __.models.syncDBTest()
  })
  it('should allow a valid user with permission to publish (MQTT) on specific topic', async () => {
    const grant = {
      grant_type: 'MQTT',
      data: {
        permission: 'SUBSCRIBE',
        resource:'/system/hello'
      }
    }
  
    const authorized = await authConnector.authorize({ namespace: 'system', name: 'admin', grant })
    assert.isTrue(authorized)
  })
  it('should deny a valid user with permission to publish (MQTT) on specific topic', async () => {
    const grant = {
      grant_type: 'MQTT',
      data: {
        permission: 'PUBLISH',
        resource: '/system'
      }
    }
   
    const authorized = await authConnector.authorize({ namespace: 'system', name: 'admin', grant })
    assert.isFalse(authorized)
  })

  it('should allow a valid user with permission to subscribe (MQTT) on wildcard topic', async () => {
    const grant = {
      grant_type: 'MQTT',
      data: {
        permission: 'SUBSCRIBE',
        resource: '/tech-12345/tracks/#'
      }
    }
   
    const authorized = await authConnector.authorize({ namespace: 'tech-12345', name: 'admin', grant })
    assert.isTrue(authorized)
  })

  it('should allow a valid user with permission to subscribe (MQTT) on wildcard topic (subtopic)', async () => {
    const grant = {
      grant_type: 'MQTT',
      data: {
        permission: 'SUBSCRIBE',
        resource: '/tech-12345/tracks/hello-goodbye'
      }
    }
   
    const authorized = await authConnector.authorize({ namespace: 'tech-12345', name: 'admin', grant })
    assert.isTrue(authorized)
  })
})
