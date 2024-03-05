/* Alexa Traffic Uzantısı */
const { remote } = require('electron');
const {
    BrowserWindow,
    nativeTheme,
    ipcMain,
    app,
    Menu,
    ipcRenderer,
    session
} = remote;
const { join } = require('path');
const manifest = require('./manifest.json');
var extensionBar = document.getElementById('extensionsMod');

/* Eklentiler Üst Menüye Ekle */
if (document.getElementById(manifest.idkey)) {
    document.getElementById(manifest.idkey).addEventListener('click', async () => {
        launchExtension();
    });
} else {
    extensionBar.innerHTML += `
<button id="${manifest.idkey}" class="re-site-info">
<img src="${join(__dirname, manifest.icons)}">
</button>`;

    setTimeout(() => {
        document.getElementById(manifest.idkey).addEventListener('click', async () => {
            launchExtension();
        });
    }, 1000);
}

async function launchExtension() {
    let extensionWindow = new BrowserWindow({
        frame: false,
        transparent: true,
        resizable: false,
        //skipTaskbar: true,
        width: 300,
        height: 400,
        x: Math.ceil(document.getElementById(manifest.idkey).getBoundingClientRect().left + window.screenX) - 280,
        y: Math.ceil(document.getElementById(manifest.idkey).getBoundingClientRect().top + window.screenY
            + parseFloat(getComputedStyle(document.getElementById(manifest.idkey), null).height.replace("px", ""))),
        //alwaysOnTop: true,
        parent: remote.getCurrentWindow(),
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
            , worldSafeExecuteJavaScript: true, contextIsolation: false
        }
    });

    let create_loadModalVPN = require('url').format({
        pathname: join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    });

    extensionWindow.focus();
    extensionWindow.webContents.once('dom-ready', async () => {
    });

    extensionWindow.on('blur', async () => {
        extensionWindow.close();
    });

    extensionWindow.loadURL(create_loadModalVPN);
}