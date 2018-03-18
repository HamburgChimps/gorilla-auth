const { Sequelize } = require('sequelize')
const moment = require('moment')

const db = new Sequelize('auth', null, null, {
  dialect: 'sqlite',
  storage: './auth.sqlite'
})

const UserModel = db.define('user', {
  namespace: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING }
})

const GroupModel = db.define('group', {
  namespace: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING }
})

const GrantModel = db.define('grant', {
  permission: { type: Sequelize.STRING },
  ressource: { type: Sequelize.STRING }
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

db.sync({ force: true }).then(async () => {
  const systemAdmin = await UserModel.create({
    namespace: "system",
    name: "admin",
    password: "admin"
  })
  const techUser = await UserModel.create({
    namespace: "tech-12345",
    name: "admin",
    password: "tech"
  })
  const wheelGroup = await systemAdmin.createGroup({
    namespace: "system",
    name: "wheel"
  })
  const systemAdminGroup = await systemAdmin.createGroup({
    namespace: "system",
    name: "admin",
  })
  const techUserGroup = await techUser.createGroup({
    namespace: "tech-12345",
    name: "admin"
  })

  await systemAdminGroup.createGrant({
    permission: 'MQTT_SUBSCRIBE',
    ressource: '/system/hello'
  })
  await systemAdminGroup.createGrant({
    permission: 'MQTT_PUBLISH',
    ressource: '/system/hello'
  })
  await techUserGroup.createGrant({
    permission: 'MQTT_SUBSCRIBE',
    ressource: '/tech-12345/tracks/#'
  })
  await techUserGroup.createGrant({
    permission: 'MQTT_PUBLISH',
    ressource: '/tech-12345/tracks/hello'
  })

  await systemAdmin.createToken({
    payload: 'jwt_token',
    expireAt: moment().add(7, 'days')
  })
})

const User = db.models.user
const Group = db.models.group
const Grant = db.models.grant
const Token = db.models.token

async function authenticateUserWithPassword ({ namespace, name, password }) {
  try {
    let authenticated = false
    const user = await UserModel.findOne({ where: { namespace, name } })
    authenticated = user.password === password
    return authenticated
  } catch(err) {
    console.log(err)
  }
}

module.exports = {
  User,
  Group,
  Grant,
  Token,
  authenticateUserWithPassword
}
