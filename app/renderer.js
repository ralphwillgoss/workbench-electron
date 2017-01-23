// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let ipc = require('electron').ipcRenderer
ipc.on('response-stdout', (event, message) => {
    document.getElementById('console').innerHTML = message + document.getElementById('console').innerHTML
})

ipc.on('response-stderr', (event, message) => {
    document.getElementById('error').innerHTML = message + document.getElementById('error').innerHTML
})

let btn = document.getElementById('btnExecute')

btn.addEventListener('click', function () {
    ipc.send('request','powershell')
})
