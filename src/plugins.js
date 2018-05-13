const pjson = require('../package.json')
const { spawn } = require('child_process')
const pino = require('pino')

class Plugins {
  constructor () {
    this._log = pino()
    this._plugins = pjson.gorillaPlugins
  }

  async load () {
    if (!this._plugins) return this._log.info('No plugins loaded')
    await this._install()
    return Object.keys(this._plugins).map(url => require(url))
  }

  _getUrls () {
    let result = []
    for (let key in this._plugins) {
      result.push(this._plugins[key])
    }
    return result
  }

  async _install () {
    for (let url of this._getUrls()) {
      await new Promise((resolve, reject) => {
        this._log.info(`Installing ${url}`)
        const npm = spawn('npm', ['install', url, '--no-save'])
        npm.stdout.on('data', (data) => {
          this._log.info(`stdout: ${data}`)
        })
        npm.on('close', (code) => {
          if (code > 0) {
            this._log.error(`Error process exited with code ${code}`)
            reject()
          } else {
            this._log.info(`child process exited with code ${code}`)
            resolve()
          }
        })
      })
    }
  }
}

module.exports = new Plugins()
