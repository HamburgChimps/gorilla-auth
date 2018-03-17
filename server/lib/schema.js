const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const mocks = require('./mocks')

const typeDefs = `
type Query {
  testString: String
}
`

const schema = makeExecutableSchema({
  typeDefs
})

addMockFunctionsToSchema({ schema, mocks })

module.exports = schema
