const { readdirSync } = require('fs')

function connectPlugins (graphqlUri) {
  const pluginPaths = readdirSync(__dirname).filter(path => !path.includes('index.js'))
  return pluginPaths.map(path => {
    const Constructor = require(`${__dirname}/${path}`)
    return new Constructor(graphqlUri)
  })
}

module.exports = connectPlugins
