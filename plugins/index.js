const { Router } = require('express')
const { readdirSync } = require('fs')
const pluginPaths = readdirSync(__dirname).filter(path => !path.includes('index.js'))

function connectPlugins (graphqlUri) {
  pluginPaths.map(path => new require(`${__dirname}/${path}`))(graphqlUri)
}

module.exports = connectPlugins
