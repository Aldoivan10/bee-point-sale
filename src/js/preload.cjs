const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("products", {
    get: (pageSize, offset, filter) =>
        ipcRenderer.invoke("fetchProducts", pageSize, offset, filter),
    total: (filter) => ipcRenderer.invoke("fetchTotalProducts", filter),
})

contextBridge.exposeInMainWorld("codes", {
    get: () => ipcRenderer.invoke("fetchCodes"),
})

contextBridge.exposeInMainWorld("users", {
    get: (user, pass) => ipcRenderer.invoke("fetchUser", user, pass),
})
