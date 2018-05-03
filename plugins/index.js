const { Router } = require('express')
const { readdirSync } = require('fs')
const pluginPaths = readdirSync(__dirname).filter(path => !path.includes('index.js'))
const plugins = pluginPaths.map(path => new require(`${__dirname}/${path}`))

module.exports = plugins
