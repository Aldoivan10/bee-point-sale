const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("node:path")
const DB = require("../model/db.js")

const db = new DB()

const createWindow = async () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    })
    /* INICIAR DB */
    await db.init("src/ferreteria.sqlite")
    /* CARGAR PAGINCA */
    win.loadFile("src/public/index.html")
}

app.whenReady().then(() => {
    ipcMain.handle(
        "fetchProducts",
        async (_, pageSize, offset) => await db.fetchProducts(pageSize, offset)
    )
    ipcMain.handle("fetchTotal", async (_, table) => await db.fetchTotal(table))
    ipcMain.handle("fetchCodes", async () => await db.fetchCodes())

    createWindow()
})
