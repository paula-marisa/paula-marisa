const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const activeWin = require('active-win');

let win;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    width,
    height,
    x: 0,
    y: 0,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, 'mascote-renderer/dist/index.html'));
  win.setIgnoreMouseEvents(true, { forward: true });

  // Verificar apps ativas a cada 0.5 segundos
  setInterval(async () => {
    const active = await activeWin();
    let estado = 'sad';

    if (active && active.owner && active.owner.name) {
      const app = active.owner.name.toLowerCase();

      if (app.includes('spotify') || app.includes('music')) {
        estado = 'musica';
      } else if (app.includes('vlc') || app.includes('video') || app.includes('movies')) {
        estado = 'filme';
      } else if (app.includes('game') || app.includes('steam')) {
        estado = 'jogar';
      } else if (['winword', 'excel', 'powerpnt', 'acrobat', 'notepad', 'code'].some(name => app.includes(name))) {
        estado = 'escrever';
      } else if (app.includes('explorer')) {
        estado = 'procurar';
      } else if (app.includes('chrome') || app.includes('firefox') || app.includes('edge')) {
        estado = 'pensar';
      }
    }

    win.webContents.send('estado-mascote', estado);
  }, 500);
}

// IPC de hover
ipcMain.on('mouse-over', () => {
  win.setIgnoreMouseEvents(false);
});

ipcMain.on('mouse-leave', () => {
  win.setIgnoreMouseEvents(true, { forward: true });
});

// Inicialização
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
