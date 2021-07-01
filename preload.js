const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  swapFilenames: async () => ipcRenderer.invoke("SWAP_FILENAMES")
});
