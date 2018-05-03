const { readdirSync, readFileSync } = require('fs')

const schema = readdirSync(__dirname)
.filter(fileName => /gql$/.test(fileName))
.map(fileName => readFileSync(`${__dirname}/${fileName}`, 'utf8'))

module.exports = schema
