'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

const path = require('path')
const url = require('url')

// Keep reference of main window because of GC
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.webContents.openDevTools()
  mainWindow.webContents.on('did-finish-load', () => { })

  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

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
  let cmd =  path.resolve("scripts", "console.test.ps1")
  console.log("execution path: " + process.cwd())
  console.log("executing: " + cmd)

  var exec = require('child_process').exec
  exec('powershell.exe -File '+ cmd, function(err, stdout, stderr) {
    mainWindow.webContents.send('response-stdout', stdout)
    mainWindow.webContents.send('response-stderr', stderr)
  })
  .stdin.end()
})
