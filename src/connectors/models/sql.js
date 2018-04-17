const { Sequelize } = require('sequelize')

// TODO
// Separate the definitions and put them in there respective db Folder

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

module.exports = {
  User,
  Group,
  Grant,
  Token,
  db
}
