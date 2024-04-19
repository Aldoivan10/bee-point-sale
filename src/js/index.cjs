const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("node:path")
const DB = require("../model/db.js")
const { Product, User } = require("../model/schemes.js")

const db = new DB()
db.init("src/ferreteria.sqlite")
const productScheme = new Product(db)
const userScheme = new User(db)

const createWindow = async () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 1280,
        minHeight: 720,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
        },
    })
    /* CARGAR PAGINCA */
    win.loadFile("src/public/index.html")
}

app.whenReady().then(() => {
    ipcMain.handle(
        "fetchProducts",
        async (_, pageSize, offset, filterCode, filterName) =>
            await productScheme.all(pageSize, offset, filterCode, filterName)
    )
    ipcMain.handle("fetchCodes", async () => await productScheme.codes())
    ipcMain.handle(
        "fetchTotalProducts",
        async (_, filterCode, filterName) =>
            await productScheme.total(filterCode, filterName)
    )
    ipcMain.handle(
        "fetchUser",
        async (user, pass) => await userScheme.get(user, pass)
    )

    createWindow()
})
