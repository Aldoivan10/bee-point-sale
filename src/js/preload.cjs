const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("products", {
    get: (pageSize, offset, filter) =>
        ipcRenderer.invoke("fetchProducts", pageSize, offset, filter),
    total: (filter) => ipcRenderer.invoke("fetchTotalProducts", filter),
    create: (product) => ipcRenderer.invoke("createProduct", product),
    delete: (ids) => ipcRenderer.invoke("deleteProducts", ids),
})

contextBridge.exposeInMainWorld("codes", {
    get: () => ipcRenderer.invoke("fetchCodes"),
})

contextBridge.exposeInMainWorld("units", {
    get: () => ipcRenderer.invoke("fetchUnits"),
})

contextBridge.exposeInMainWorld("users", {
    get: (user, pass) => ipcRenderer.invoke("fetchUser", user, pass),
})
