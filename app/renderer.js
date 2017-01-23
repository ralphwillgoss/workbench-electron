// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var ipc = require('electron').ipcRenderer
ipc.on('response', (event, message) => {
    console.log(message)
})

var btn = document.getElementById('btnExecute')

btn.addEventListener('click', function () {
    ipc.send('request','powershell')
})
