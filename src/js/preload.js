const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("products", {
    get: (pageSize, offset, filterCode, filterName) =>
        ipcRenderer.invoke(
            "fetchProducts",
            pageSize,
            offset,
            filterCode,
            filterName
        ),
    total: () => ipcRenderer.invoke("fetchTotal", "producto"),
})

contextBridge.exposeInMainWorld("codes", {
    get: () => ipcRenderer.invoke("fetchCodes"),
})
