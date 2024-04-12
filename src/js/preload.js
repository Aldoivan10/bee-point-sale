const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("products", {
    get: () => ipcRenderer.invoke("fetchProducts"),
})
