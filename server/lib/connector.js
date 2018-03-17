const { Sequelize } = require('sequelize')

const db = new Sequelize('auth', null, null, {
    dialect: 'sqlite',
    storage: './auth.sqlite',
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
    creationDate: { type: Sequelize.DATE},
    expirationDate: { type: Sequelize.DATE}
})



UserModel.hasMany(GroupModel);
UserModel.hasMany(TokenModel);
TokenModel.belongsTo(UserModel)

GroupModel.hasMany(UserModel)
GroupModel.hasMany(GrantModel);

