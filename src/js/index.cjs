const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("node:path")
const DB = require("../model/db.js")

const db = new DB()

const createWindow = async () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
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
    ipcMain.handle("fetchProducts", async () => await db.fetchProducts())
    ipcMain.handle("fetchCodes", async () => await db.fetchCodes())

    createWindow()
})
