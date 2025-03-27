const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 500,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  // ⚠️ Durante desenvolvimento, usar localhost do Vite
  win.loadURL('http://localhost:5173');
  win.webContents.openDevTools(); // para debugging
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
