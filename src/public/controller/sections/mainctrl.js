const productsMapper = {
    "Precio de venta": (val) => {
        return val.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
        })
    },
    "Precio de compra": (val) => {
        return val.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
        })
    },
    Ganancia: (val) => {
        return val.toLocaleString("es-MX", { style: "percent" })
    },
    Descuento: (val) => {
        return val.toLocaleString("es-MX", { style: "percent" })
    },
}
const productModel = new ProductModel()
const clientModel = new TableModel()
const menuOptions = {
    Productos: [window.parent.products, productModel, productsMapper],
    Clientes: [window.parent.clients, clientModel, {}],
}

const tableView = new TableView($table)
const pagination = new Pagination($pagination, $pageSize)
const tableCtrl = new TableController(
    tableView,
    productModel,
    pagination,
    $filter,
    $delItems,
    window.parent.appAlert,
    productsMapper
)

productModel.addHeaderListener(tableCtrl.onHeaderUpdate)
productModel.addDataListener(tableCtrl.onDataUpdate)
clientModel.addHeaderListener(tableCtrl.onHeaderUpdate)
clientModel.addDataListener(tableCtrl.onDataUpdate)

$footer.addEventListener("load", () => {
    const $menu = $footer.contentDocument.getElementById("$menu")
    const menu = new Menu($menu)
    menu.addListenerOpt((opt) => {
        const option = menuOptions[opt]
        tableCtrl.swap(option[0], option[1], option[2])
    })
})

tableCtrl.init()
