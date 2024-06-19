const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron")
const {
    Product,
    User,
    Unit,
    Code,
    Rol,
    Client,
    KeyBoard,
    Departament,
    Ticket,
    Log,
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
const departamentScheme = new Departament(db)
const rolScheme = new Rol(db)
const ticketScheme = new Ticket(db)
const logScheme = new Log(db)

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
            const map = keys[key]
            if (map.func.includes("view"))
                win.webContents.send("change-view", map.view, map.admin)
            else win.webContents.send(map.func)
        })
    }

    app.on("browser-window-focus", () => {
        for (const key of Object.keys(keys)) {
            globalShortcut.register(key, () => {
                const map = keys[key]
                if (map.func.includes("view"))
                    win.webContents.send("change-view", map.view, map.admin)
                else win.webContents.send(map.func)
            })
        }
    })

    app.on("browser-window-blur", () => {
        for (const key of Object.keys(keys)) {
            globalShortcut.unregister(key)
        }
    })

    /* DATA UPDATED */
    const catalogUpdated = (catalog) => {
        return () => win.webContents.send("catalog-updated", catalog)
    }

    productScheme.onUpdated(() => {
        win.webContents.send("data-updated", "productos")
    })
    codeScheme.onUpdated(catalogUpdated("codes"))
    unitScheme.onUpdated(catalogUpdated("units"))
    departamentScheme.onUpdated(catalogUpdated("departaments"))
    rolScheme.onUpdated(catalogUpdated("roles"))
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
        "fetch-product",
        async (_, id) => await productScheme.get(id)
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
    ipcMain.handle(
        "create-code",
        async (_, code) => await codeScheme.create(code)
    )
    ipcMain.handle(
        "delete-codes",
        async (_, ids) => await codeScheme.delete(ids)
    )
    ipcMain.handle("edit-code", async (_, obj) => await codeScheme.update(obj))
    /* UNITS */
    ipcMain.handle("fetch-units", async () => await unitScheme.all())
    ipcMain.handle(
        "create-unit",
        async (_, unit) => await unitScheme.create(unit)
    )
    ipcMain.handle(
        "delete-units",
        async (_, ids) => await unitScheme.delete(ids)
    )
    ipcMain.handle("edit-unit", async (_, obj) => await unitScheme.update(obj))
    /* ROL */
    ipcMain.handle("fetch-roles", async () => await rolScheme.all())
    ipcMain.handle("create-rol", async (_, rol) => await rolScheme.create(rol))
    ipcMain.handle(
        "delete-roles",
        async (_, ids) => await rolScheme.delete(ids)
    )
    ipcMain.handle("edit-rol", async (_, obj) => await rolScheme.update(obj))
    /* USER */
    ipcMain.handle(
        "fetch-user",
        async (_, user, pass) => await userScheme.get(user, pass)
    )
    ipcMain.handle("fetch-users", async () => await userScheme.all())
    ipcMain.handle("edit-user", async (_, obj) => await unitScheme.update(obj))
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
    ipcMain.handle(
        "delete-clients",
        async (_, ids) => await clientScheme.delete(ids)
    )
    ipcMain.handle(
        "edit-client",
        async (_, obj) => await clientScheme.update(obj)
    )
    /* DEPARTAMENTS */
    ipcMain.handle(
        "fetch-departaments",
        async () => await departamentScheme.all()
    )
    ipcMain.handle(
        "create-departament",
        async (_, departament) => await departamentScheme.create(departament)
    )
    ipcMain.handle(
        "delete-departaments",
        async (_, ids) => await departamentScheme.delete(ids)
    )
    ipcMain.handle(
        "edit-departament",
        async (_, obj) => await departamentScheme.update(obj)
    )
    /* TICKET */
    ipcMain.handle("fetch-ticket", async () => await ticketScheme.all())
    ipcMain.handle(
        "update-ticket",
        async (_, ticket) => await ticketScheme.update(ticket)
    )
    /* LOG */
    ipcMain.handle("save-log", async (_, data) => await logScheme.save(data))

    /* globalShortcut.unregister("F5")
    globalShortcut.unregister("CommandOrControl+R") */

    createWindow()
})

/* const printer = new BrowserWindow()
const printerOptions = {
    silent: true,
    deviceName: "My-Printer",
}
 */
const Printer = require("node-printer")
Printer.list()
