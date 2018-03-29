const { readdirSync, readFileSync } = require('fs')

const schema = readdirSync(__dirname)
.filter(fileName => fileName.includes('.gql'))
.map(fileName => readFileSync(`${__dirname}/${fileName}`, 'utf8'))

module.exports = schema
