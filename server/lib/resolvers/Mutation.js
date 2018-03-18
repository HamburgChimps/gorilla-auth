const { User, Group } = require('../connector')

const Mutation = {
  async createUser (root, args) {
    const {namespace, name, password, groups } = args
    const newUser = await User.create({namespace, name, password})
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
