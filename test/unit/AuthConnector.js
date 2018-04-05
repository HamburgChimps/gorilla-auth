
/* global describe, it , before */
const { assert } = require('chai')
const { syncDBTest } = require('../fixtures/SetupDB')
const { AuthConnector , __ } = require('../../src/connectors')

describe.only('AuthConnector', () => {
  const authConnector = new AuthConnector()
  before(async () => {
    await syncDBTest(__.models)
  })

  it('should authorize a valid user with permission to connect (MQTT)', async () => {
    const mqttGrant = {
        permission: 'CONNECT',
    }
    const { isAllowed } = await authConnector.authorizeMQTTConnect({ namespace: 'system', name: 'admin'})
    assert.isTrue(isAllowed)
  })

  it('should authorize a valid user with permission to publish (MQTT) on specific topic', async () => {
    const mqttGrant = {
        permission: 'PUBLISH',
        topic:'system/hello'
    }
  
    const { isAllowed } = await authConnector.authorizeMQTTPublish({ namespace: 'system', name: 'admin', mqttGrant })
    assert.isTrue(isAllowed)
  })

  it('should deny a valid user with permission to publish (MQTT) on specific topic', async () => {
    const mqttGrant = {
        permission: 'PUBLISH',
        topic: 'system'
    }
   
    const { isAllowed } = await authConnector.authorizeMQTTPublish({ namespace: 'system', name: 'admin', mqttGrant })
    assert.isFalse(isAllowed)
  })

  it('should authorize a valid user with permission to subscribe (MQTT) on wildcard topic', async () => {
    const mqttGrants = [{
        permission: 'SUBSCRIBE',
        topic: 'tech-12345/tracks/#'
    }]
   
    const allowedGrants = await authConnector.authorizeMQTTSubscribe({ namespace: 'tech-12345', name: 'admin', mqttGrants })
    assert.isTrue(allowedGrants[0].isAllowed)
  })

  it('should authorize a valid user with permission to subscribe (MQTT) on wildcard topic (subtopic)', async () => {
    const mqttGrants = [{
      permission: 'SUBSCRIBE',
      topic: 'tech-12345/tracks/hello-goodbye'
    }]
   
    const allowedGrants = await authConnector.authorizeMQTTSubscribe({ namespace: 'tech-12345', name: 'admin', mqttGrants })
    assert.isTrue(allowedGrants[0].isAllowed)
  })
})
