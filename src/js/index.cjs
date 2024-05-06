const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron")
const { Product, User, Unit, Code } = require("../model/schemes.js")
const path = require("node:path")
const DB = require("../model/db.js")

const db = new DB()
db.init("src/ferreteria.sqlite")

const productScheme = new Product(db)
const userScheme = new User(db)
const unitScheme = new Unit(db)
const codeScheme = new Code(db)

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
    win.menuBarVisible = false

    app.on("browser-window-focus", () => {
        globalShortcut.register("CommandOrControl+T", () => {
            win.webContents.send("add-tab")
        })
    })

    app.on("browser-window-blur", function () {
        globalShortcut.unregister("CommandOrControl+T")
    })
}

app.whenReady().then(async () => {
    ipcMain.handle(
        "fetchProducts",
        async (_, pageSize, offset, filter) =>
            await productScheme.all(pageSize, offset, filter)
    )
    ipcMain.handle(
        "createProduct",
        async (_, product) => await productScheme.create(product)
    )
    ipcMain.handle(
        "deleteProducts",
        async (_, ids) => await productScheme.delete(ids)
    )
    ipcMain.handle("fetchCodes", async () => await codeScheme.all())
    ipcMain.handle("fetchUnits", async () => await unitScheme.all())
    ipcMain.handle(
        "fetchTotalProducts",
        async (_, filter) => await productScheme.total(filter)
    )
    ipcMain.handle(
        "fetchUser",
        async (_, user, pass) => await userScheme.get(user, pass)
    )

    /* globalShortcut.unregister("F5")
    globalShortcut.unregister("CommandOrControl+R") */

    createWindow()
})
