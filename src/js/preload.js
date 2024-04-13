const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("products", {
    get: (pageSize, offset) =>
        ipcRenderer.invoke("fetchProducts", pageSize, offset),
    total: () => ipcRenderer.invoke("fetchTotal", "producto"),
})

contextBridge.exposeInMainWorld("codes", {
    get: () => ipcRenderer.invoke("fetchCodes"),
})
