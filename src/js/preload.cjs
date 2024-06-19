const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("products", {
    get: (pageSize, offset, filter) =>
        ipcRenderer.invoke("fetch-products", pageSize, offset, filter),
    find: (id) => ipcRenderer.invoke("fetch-product", id),
    total: (filter) => ipcRenderer.invoke("fetch-total-products", filter),
    create: (product) => ipcRenderer.invoke("create-product", product),
    delete: (ids) => ipcRenderer.invoke("delete-products", ids),
    edit: (obj) => ipcRenderer.invoke("edit-product", obj),
})

contextBridge.exposeInMainWorld("codes", {
    get: () => ipcRenderer.invoke("fetch-codes"),
    create: (code) => ipcRenderer.invoke("create-code", code),
    delete: (ids) => ipcRenderer.invoke("delete-codes", ids),
    edit: (obj) => ipcRenderer.invoke("edit-code", obj),
})

contextBridge.exposeInMainWorld("units", {
    get: () => ipcRenderer.invoke("fetch-units"),
    create: (unit) => ipcRenderer.invoke("create-unit", unit),
    delete: (ids) => ipcRenderer.invoke("delete-units", ids),
    edit: (obj) => ipcRenderer.invoke("edit-unit", obj),
})

contextBridge.exposeInMainWorld("users", {
    get: () => ipcRenderer.invoke("fetch-users"),
    find: (user, pass) => ipcRenderer.invoke("fetch-user", user, pass),
    delete: (ids) => ipcRenderer.invoke("delete-users", ids),
    edit: (obj) => ipcRenderer.invoke("edit-user", obj),
})

contextBridge.exposeInMainWorld("clients", {
    get: (pageSize, offset, filter) =>
        ipcRenderer.invoke("fetch-clients", pageSize, offset, filter),
    total: (filter) => ipcRenderer.invoke("fetch-total-clients", filter),
    delete: (ids) => ipcRenderer.invoke("delete-clients", ids),
    edit: (obj) => ipcRenderer.invoke("edit-client", obj),
})

contextBridge.exposeInMainWorld("roles", {
    get: () => ipcRenderer.invoke("fetch-roles"),
    create: (rol) => ipcRenderer.invoke("create-rol", rol),
    delete: (ids) => ipcRenderer.invoke("delete-roles", ids),
    edit: (obj) => ipcRenderer.invoke("edit-rol", obj),
})

contextBridge.exposeInMainWorld("departaments", {
    get: () => ipcRenderer.invoke("fetch-departaments"),
    create: (departament) =>
        ipcRenderer.invoke("create-departament", departament),
    delete: (ids) => ipcRenderer.invoke("delete-departaments", ids),
    edit: (obj) => ipcRenderer.invoke("edit-departament", obj),
})

contextBridge.exposeInMainWorld("cart", {
    get: () => ipcRenderer.invoke("fetch-cart"),
    create: (data) => ipcRenderer.invoke("save-cart", data),
    delete: (items) => ipcRenderer.invoke("delete-item-cart", items),
    add: (item) => ipcRenderer.invoke("add-item-cart", item),
    clear: () => ipcRenderer.invoke("clear-cart"),
})

contextBridge.exposeInMainWorld("api", {
    onAddTab: (callback) => ipcRenderer.on("add-tab", (_event) => callback()),
    onDelTab: (callback) => ipcRenderer.on("del-tab", (_event) => callback()),
    onChangeView: (callback) =>
        ipcRenderer.on("change-view", (_event, view, admin) =>
            callback(view, admin)
        ),
    onDataUpdated: (callback) =>
        ipcRenderer.on("data-updated", (_event, className) =>
            callback(className)
        ),
    onCatalogUpdated: (callback) =>
        ipcRenderer.on("catalog-updated", (_event, catalog) =>
            callback(catalog)
        ),
    getkeyMap: () => ipcRenderer.invoke("key-map"),
    ticket: () => ipcRenderer.invoke("fetch-ticket"),
    updateTicket: (ticket) => ipcRenderer.invoke("update-ticket", ticket),
    saveLog: (data) => ipcRenderer.invoke("save-log", data),
})
