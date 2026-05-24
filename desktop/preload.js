const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Storage
  storeGet: (key, defaultValue) => ipcRenderer.invoke('store-get', key, defaultValue),
  storeSet: (key, value) => ipcRenderer.invoke('store-set', key, value),
  storeDelete: (key) => ipcRenderer.invoke('store-delete', key),

  // Clipboard
  clipboardWrite: (text) => ipcRenderer.invoke('clipboard-write', text),

  // AI Enhancement
  enhancePrompt: (data) => ipcRenderer.invoke('enhance-prompt', data),

  // Updates
  checkUpdate: () => ipcRenderer.invoke('check-update'),

  // App info
  getVersion: () => ipcRenderer.invoke('get-version')
});
