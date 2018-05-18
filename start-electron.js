const { app, BrowserWindow } = require('electron')
const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 960
  })

  // TODO: Only install Vue devtools for dev, not prod.
  installExtension(VUEJS_DEVTOOLS).then(() => {
    mainWindow.loadURL('http://localhost:8080')

    // Only open the dev tools once the DOM is ready. This avoids a spam of "Extension server error: Operation failed"
    // error messages from Electron due to the dev tools not able to read the page before it's loaded:
    // https://github.com/electron/electron/issues/12438
    mainWindow.webContents.once('dom-ready', () => {
      mainWindow.webContents.openDevTools()
    })
  })
})
