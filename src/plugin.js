const pjson = require('../package.json')
const { spawn } = require('child_process')
const pino = require('pino')

class Plugins {
  constructor () {
    this._log = pino()
  }

  async load () {
    const plugins = pjson.gorillaPlugins
    if (!plugins) this._log.info('No plugins loaded')
    await this._install(plugins)
    return
  }

  _getUrls (plugins) {
    let result = []
    for (let key in plugins) {
      result.push(plugins[key])
    }
    return result
  }

  async _install () {
    for (let url of this._getUrls()) {
      await new Promise((resolve, reject) => {
        this._log.info(`Installing ${url}`)
        const npm = spawn('npm', ['install', url, '--no-save'])
        npm.stdout.on('data', (data) => {
          this._log.log(`stdout: ${data}`)
        })
        npm.on('close', (code) => {
          this._log.log(`child process exited with code ${code}`)
          resolve()
        })
      })
    }
  }

}

const demo = new Plugins()
demo.load()

module.exports = new Plugins()
