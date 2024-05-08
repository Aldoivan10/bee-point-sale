const tableModel = new ProductModel()
const tableView = new TableView($tblProducts)
const productPagination = new Pagination($productsPagination, $pageSize)
const tableCtrl = new TableController(
    tableView,
    tableModel,
    productPagination,
    $filter,
    $delItems,
    window.parent.appAlert,
    {
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
).init()
