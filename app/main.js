const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const { autoUpdater } = require("electron-updater")
const createPrevWindow = require('./window')

// Keep reference of main window because of GC
let mainWindow

function createWindow () {
  mainWindow = createPrevWindow('main', { width: 1024, height: 800, show: false });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.webContents.on('did-finish-load', () => { })
  mainWindow.webContents.openDevTools();

  mainWindow.once('ready-to-show', () => { mainWindow.show() })

  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  
  autoUpdater.logger = require("electron-log")
  autoUpdater.logger.transports.file.level = "debug"
  autoUpdater.autoDownload = false;
  autoUpdater.setFeedURL("http://127.0.0.1:8080/")
  autoUpdater.on('checking-for-update', () => {
    console.log("checking for update")
    mainWindow.webContents.send('response-autoUpdate', 'checking...')
  })
  autoUpdater.on('update-available', () => {
    console.log("update available")
    mainWindow.webContents.send('response-autoUpdate', 'available')
  })
  autoUpdater.on('update-not-available', () => {
    console.log("update not available")
    mainWindow.webContents.send('response-autoUpdate', 'not available')
  })
  autoUpdater.on('update-downloaded', () => {
    console.log("update downloaded")
    mainWindow.webContents.send('response-autoUpdate', 'ready for install')
  })
 
  require('./main-menu')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('request', (event, arg) => {
  if (arg === 'update')
  {
    autoUpdater.checkForUpdates()
  } 
  else
  {
    let cmd = path.resolve('scripts', 'console.test.ps1')
    console.log('execution path: ' + process.cwd())
    console.log('executing: ' + cmd)

    let exec = require('child_process').exec
    exec('powershell.exe -File ' + cmd)
    .stdout.on('data', (chunk) => {
      mainWindow.webContents.send('response-stdout', chunk)
    })
    // .stderr.on('error', (chunk) => {
    //   mainWindow.webContents.send('response-stderr', chunk)
    // })
  }
})

