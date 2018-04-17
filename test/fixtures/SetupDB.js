const bcrypt = require('bcrypt')
const moment = require('moment')
const jwt = require('jsonwebtoken')

async function syncDBTest (params) {
  const { db } = params
  return db.sync({ force: true }).then(async () => {
    const systemAdmin = await db.models.user.create({
      namespace: 'system',
      name: 'admin',
      encrypted_password: await bcrypt.hash('admin', 12)
    })
    const techUser = await db.models.user.create({
      namespace: 'tech-12345',
      name: 'admin',
      encrypted_password: await bcrypt.hash('tech', 12)
    })
    const wheelGroup = await systemAdmin.createGroup({
      namespace: 'system',
      name: 'wheel'
    })
    const systemAdminGroup = await systemAdmin.createGroup({
      namespace: 'system',
      name: 'admin',
    })
    const techUserGroup = await techUser.createGroup({
      namespace: 'tech-12345',
      name: 'admin'
    })

    await wheelGroup.createGrant({
      grant_type: 'MQTT',
      data: {
        permission: 'CONNECT',
      }
    })

    await wheelGroup.createGrant({
      grant_type: 'MQTT',
      data: {
        permission: 'SUBSCRIBE',
        topic:'#'
      }
    })
  
    await systemAdminGroup.createGrant({
      grant_type: 'MQTT',
      data: {
        permission: 'CONNECT',
      }
    })
    await systemAdminGroup.createGrant({
      grant_type: 'MQTT',
      data: {
        permission: 'SUBSCRIBE',
        topic:'system/hello'
      }
    })
    await systemAdminGroup.createGrant({
      grant_type: 'MQTT',
      data: {
        permission: 'PUBLISH',
        topic:'system/hello'
      }
    })

    await techUserGroup.createGrant({
      grant_type: 'MQTT',
      data: {
        permission: 'CONNECT',
      }
    })
    await techUserGroup.createGrant({
      grant_type: 'MQTT',
      data: {
        permission: 'SUBSCRIBE',
        topic: 'tech-12345/tracks/#'
      }
    })
    await techUserGroup.createGrant({
      grant_type: 'MQTT',
      data: {
        permission: 'PUBLISH',
        topic: 'tech-12345/tracks/#'
      }

    })
    const expireAt = moment().add(7, 'days')
    const tokenData = {
      namespace: systemAdmin.namespace,
      name: systemAdmin.name,
      context: 'HTTP'
    }
    await systemAdmin.createToken({
      payload: await jwt.sign({
        exp: expireAt.unix(),
        data: tokenData
      }, 'SUPER_SECRET'),
      expireAt
    })
  })
  
}

module.exports = {
  syncDBTest
}
