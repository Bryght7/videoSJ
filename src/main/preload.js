const { contextBridge, ipcRenderer } = require('electron');

// ICP stuff (🔎 for other ICP references)
contextBridge.exposeInMainWorld('api', {
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
});
