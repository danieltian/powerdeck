const webpack = require('webpack')
const config = require('./webpack.config.js')
const WebpackDevServer = require('webpack-dev-server')
const { app, BrowserWindow } = require('electron')
const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')

var onDevServerStarted = new Promise((resolve) => {
  new WebpackDevServer(webpack(config), config.devServer).listen(8080, 'localhost', resolve)
})

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 960
  })

  // TODO: Only do this for dev, not prod.
  installExtension(VUEJS_DEVTOOLS)

  mainWindow.webContents.openDevTools()

  onDevServerStarted.then(() => mainWindow.loadURL('http://localhost:8080'))
})
