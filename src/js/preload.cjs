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
    total: (filterCode, filterName) =>
        ipcRenderer.invoke("fetchTotalProducts", filterCode, filterName),
})

contextBridge.exposeInMainWorld("codes", {
    get: () => ipcRenderer.invoke("fetchCodes"),
})

contextBridge.exposeInMainWorld("users", {
    get: (user, pass) => ipcRenderer.invoke("fetchUser", user, pass),
})
