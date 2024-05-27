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
    create: (code) => ipcRenderer.invoke("create-code", code),
})

contextBridge.exposeInMainWorld("units", {
    get: () => ipcRenderer.invoke("fetch-units"),
    create: (unit) => ipcRenderer.invoke("create-unit", unit),
})

contextBridge.exposeInMainWorld("users", {
    get: () => ipcRenderer.invoke("fetch-users"),
    find: (user, pass) => ipcRenderer.invoke("fetch-user", user, pass),
})

contextBridge.exposeInMainWorld("clients", {
    get: (pageSize, offset, filter) =>
        ipcRenderer.invoke("fetch-clients", pageSize, offset, filter),
    total: (filter) => ipcRenderer.invoke("fetch-total-clients", filter),
})

contextBridge.exposeInMainWorld("departaments", {
    get: () => ipcRenderer.invoke("fetch-departaments"),
    create: (departament) =>
        ipcRenderer.invoke("create-departament", departament),
})

contextBridge.exposeInMainWorld("api", {
    onAddTab: (callback) => ipcRenderer.on("add-tab", (_event) => callback()),
    onDelTab: (callback) => ipcRenderer.on("del-tab", (_event) => callback()),
    onClientsView: (callback) =>
        ipcRenderer.on("clients-view", (_event) => callback("Clientes")),
    onProductsView: (callback) =>
        ipcRenderer.on("products-view", (_event) => callback("Productos")),
    onDataUpdated: (callback) =>
        ipcRenderer.on("data-updated", (_event, className) =>
            callback(className)
        ),
    getkeyMap: () => ipcRenderer.invoke("key-map"),
})
