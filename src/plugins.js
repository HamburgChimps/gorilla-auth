const pjson = require('../package.json')
const pino = require('pino')

class Plugins {
  constructor () {
    this._log = pino()
    this._plugins = pjson.peerDependencies
  }

  async load () {
    if (!this._plugins) return this._log.info('No plugins loaded')
    return Object.keys(this._plugins).map(plugin => {
      try {
        const pluginPackage = require(plugin)
        return pluginPackage
      } catch (err) {
        this._log.info(`Plugin ${plugin} was not found, ignoring.`, err)
      }
    })
  }
}

module.exports = new Plugins()
