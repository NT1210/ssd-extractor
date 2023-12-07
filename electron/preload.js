const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  openDialog: ()=> ipcRenderer.invoke('open-dialog'),
  getDesktop: ()=> ipcRenderer.invoke('get-desktop'),
  extract:  (file)=>  ipcRenderer.invoke('ssd-extract', file),
  extractCrab:  (file)=>  ipcRenderer.invoke('ssd-extract-crab', file),
  extractCrabOP: (file) => ipcRenderer.invoke('ssd-extract-crabop', file)
});

