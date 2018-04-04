const { Sequelize } = require('sequelize')
const bcrypt = require('bcrypt')
const moment = require('moment')
const jwt = require('jsonwebtoken')

// TODO
// Separate the definitions and put them in there respective db Folder

// const db = new Sequelize('auth', null, null, {
//   dialect: 'sqlite',
//   storage: './auth.sqlite',
// })

const db = new Sequelize('postgres://user:password@db/db')

const UserModel = db.define('user', {
  namespace: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
  encrypted_password: { type: Sequelize.STRING }
})

const GroupModel = db.define('group', {
  namespace: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING }
})

const GrantModel = db.define('grant', {
  grant_type: { type: Sequelize.STRING },
  data: { type: Sequelize.JSONB}
})

const TokenModel = db.define('token', {
  payload: { type: Sequelize.STRING },
  expireAt: { type: Sequelize.DATE }
})

UserModel.belongsToMany(GroupModel, {
  through: 'User_Group',  //this can be string or a model,
  foreignKey: 'User_userId'
})
UserModel.hasMany(TokenModel)

TokenModel.belongsTo(UserModel)

GroupModel.belongsToMany(UserModel, {
  as: 'members',
  through: 'User_Group',  //this can be string or a model,
  foreignKey: 'Group_groupId'
})
GroupModel.hasMany(GrantModel, {

})
GrantModel.belongsTo(GroupModel)


const User = db.models.user
const Group = db.models.group
const Grant = db.models.grant
const Token = db.models.token

async function syncDBTest (params) {
  return db.sync({ force: true }).then(async () => {
    const systemAdmin = await UserModel.create({
      namespace: 'system',
      name: 'admin',
      encrypted_password: await bcrypt.hash('admin', 12)
    })
    const techUser = await UserModel.create({
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
  User,
  Group,
  Grant,
  Token,
  syncDBTest
}
