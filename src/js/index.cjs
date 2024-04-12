const { app, BrowserWindow } = require("electron")
const path = require("path")
const DB = require("../model/db.js")

const db = new DB()

const createWindow = async () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "src/js/preload.js"),
        },
    })
    /* INICIAR DB */
    await db.init("src/ferreteria.sqlite")
    /* CARGAR PAGINCA */
    win.loadFile("src/index.html")
}

app.whenReady().then(() => {
    createWindow()
})
