const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    minimizeApp: () => ipcRenderer.send('minimizeApp'),
    maximizeApp: () => ipcRenderer.send('maximizeApp'),
    closeApp: () => ipcRenderer.send('closeApp'),
});