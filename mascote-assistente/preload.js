const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    onEstadoMascote: (callback) => ipcRenderer.on('estado-mascote', (event, estado) => callback(estado)),
    mouseOver: () => ipcRenderer.send('mouse-over'),
    mouseLeave: () => ipcRenderer.send('mouse-leave'),

    // Aqui está a nova função
    closeApp: () => ipcRenderer.send('app-close')
});
