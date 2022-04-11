const { contextBridge, ipcRenderer } = require('electron');

// ICP stuff (🔎 for other ICP references)
contextBridge.exposeInMainWorld('api', {
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
  saveFileDialog: () => ipcRenderer.invoke('save-file-dialog'),
  createInputFile: (videoUrl, parts) =>
    ipcRenderer.invoke('create-input-file', videoUrl, parts),
  splitJoin: (outputFilePath) =>
    ipcRenderer.invoke('split-join', outputFilePath),
  openOutputDir: (outputFilePath) =>
    ipcRenderer.invoke('open-output-dir', outputFilePath),
});
