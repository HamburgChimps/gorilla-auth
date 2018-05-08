const Postgres = require('../utils/Postgres')
const { Sequelize } = require('sequelize')

const db = Postgres.init()

const UserModel = db.define('user', {
  namespace: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
  encrypted_password: { type: Sequelize.STRING }
})

const GroupModel = db.define('group', {
  namespace: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING }
})

UserModel.belongsToMany(db.models.group, {
  through: 'User_Group',  // this can be string or a model,
  foreignKey: 'User_userId'
})

const TokenModel = db.define('token', {
  payload: { type: Sequelize.STRING },
  expireAt: { type: Sequelize.DATE }
})

UserModel.hasMany(db.models.token)

const GrantModel = db.define('grant', {
  grant_type: { type: Sequelize.STRING },
  data: { type: Sequelize.JSONB }
})

TokenModel.belongsTo(db.models.user)

GroupModel.belongsToMany(db.models.user, {
  as: 'members',
  through: 'User_Group',  // this can be string or a model,
  foreignKey: 'Group_groupId'
})

GroupModel.hasMany(GrantModel, {})
GrantModel.belongsTo(GroupModel)

const User = db.models.user
const Group = db.models.group
const Grant = db.models.grant
const Token = db.models.token

module.exports = {
  User,
  Group,
  Grant,
  Token,
  db
}
