const bcrypt = require('bcrypt')
const { User, Group } = require('../connector')

const Mutation = {
  async createUser (root, args) {
    const {namespace, name, password, groups } = args
    const encrypted_password = await bcrypt.hash(password, 12)
    const newUser = await User.create({namespace, name, encrypted_password})
     await Group.findOrCreate({
      where: {
        namespace,
        name
      }
    }).spread((group, created) =>{
      return newUser.addGroup(group)
    })
    return newUser
  },
  createGroup (root, args) {
    return Group.create(args)
  }
}
module.exports = Mutation
