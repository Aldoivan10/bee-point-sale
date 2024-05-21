const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron")
const {
    Product,
    User,
    Unit,
    Code,
    Client,
    KeyBoard,
} = require("../model/schemes.js")
const path = require("node:path")
const DB = require("../model/db.js")

const db = new DB()
db.init("src/ferreteria.sqlite")

const productScheme = new Product(db)
const userScheme = new User(db)
const unitScheme = new Unit(db)
const codeScheme = new Code(db)
const clientScheme = new Client(db)
const keyBoard = new KeyBoard(db)

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

    /* CARGAR PAGINA */
    win.loadFile("src/public/index.html")
    win.menuBarVisible = false

    /* LOAD KEYS SHORTCUTS */
    const keys = await keyBoard.keys()

    for (const key of Object.keys(keys)) {
        globalShortcut.register(key, () => {
            win.webContents.send(keys[key])
        })
    }

    app.on("browser-window-focus", () => {
        for (const key of Object.keys(keys)) {
            globalShortcut.register(key, () => {
                win.webContents.send(keys[key])
            })
        }
    })

    app.on("browser-window-blur", () => {
        for (const key of Object.keys(keys)) {
            globalShortcut.unregister(key)
        }
    })

    /* DATA UPDATED */
    productScheme.onUpdated(() => {
        win.webContents.send("data-updated", "productos")
    })
}

app.whenReady().then(async () => {
    ipcMain.handle("key-map", async () => await keyBoard.keys())

    /* PRODUCTS*/
    ipcMain.handle(
        "fetch-products",
        async (_, pageSize, offset, filter) =>
            await productScheme.all(pageSize, offset, filter)
    )
    ipcMain.handle(
        "create-product",
        async (_, product) => await productScheme.create(product)
    )
    ipcMain.handle(
        "delete-products",
        async (_, ids) => await productScheme.delete(ids)
    )
    ipcMain.handle(
        "fetch-total-products",
        async (_, filter) => await productScheme.total(filter)
    )
    /* CODES */
    ipcMain.handle("fetch-codes", async () => await codeScheme.all())
    /* UNITS */
    ipcMain.handle("fetch-units", async () => await unitScheme.all())
    /* USER */
    ipcMain.handle(
        "fetch-user",
        async (_, user, pass) => await userScheme.get(user, pass)
    )
    /* CLIENTS */
    ipcMain.handle(
        "fetch-clients",
        async (_, pageSize, offset, filter) =>
            await clientScheme.all(pageSize, offset, filter)
    )
    ipcMain.handle(
        "fetch-total-clients",
        async (_, filter) => await clientScheme.total(filter)
    )

    /* globalShortcut.unregister("F5")
    globalShortcut.unregister("CommandOrControl+R") */

    createWindow()
})
