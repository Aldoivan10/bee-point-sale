const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("products", {
    get: () => ipcRenderer.invoke("fetchProducts"),
})

contextBridge.exposeInMainWorld("codes", {
    get: () => ipcRenderer.invoke("fetchCodes"),
})
