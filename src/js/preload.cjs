const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("products", {
    get: (pageSize, offset, filter) =>
        ipcRenderer.invoke("fetch-products", pageSize, offset, filter),
    total: (filter) => ipcRenderer.invoke("fetch-total-products", filter),
    create: (product) => ipcRenderer.invoke("create-product", product),
    delete: (ids) => ipcRenderer.invoke("delete-products", ids),
})

contextBridge.exposeInMainWorld("codes", {
    get: () => ipcRenderer.invoke("fetch-codes"),
})

contextBridge.exposeInMainWorld("units", {
    get: () => ipcRenderer.invoke("fetch-units"),
})

contextBridge.exposeInMainWorld("users", {
    get: (user, pass) => ipcRenderer.invoke("fetch-user", user, pass),
})

contextBridge.exposeInMainWorld("clients", {
    get: (pageSize, offset, filter) =>
        ipcRenderer.invoke("fetch-clients", pageSize, offset, filter),
    total: (filter) => ipcRenderer.invoke("fetch-total-clients", filter),
})

contextBridge.exposeInMainWorld("api", {
    onAddTab: (callback) => ipcRenderer.on("add-tab", (_event) => callback()),
    onDelTab: (callback) => ipcRenderer.on("del-tab", (_event) => callback()),
    onDataUpdated: (callback) =>
        ipcRenderer.on("data-updated", (_event, className) =>
            callback(className)
        ),
})
