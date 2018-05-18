const webpack = require('webpack')
const config = require('./webpack.config.js')
const WebpackDevServer = require('webpack-dev-server')
const electron = require('electron')
const { spawn } = require('child_process')

new WebpackDevServer(webpack(config), config.devServer).listen(8080, 'localhost', () => {
  console.log('dev server running on localhost:8080')
  let electronProcess = spawn(electron, ['./start-electron.js'])

  electronProcess.stdout.on('data', (data) => console.log(data.toString()))
  electronProcess.stderr.on('data', (data) => console.log(data.toString()))
  electronProcess.on('close', (code) => process.exit(code))
})
