function initTable() {
    const { $table, $filter, $pagination, $pageSizeSelector, $btnDelItem } =
        tableVars()

    new TableController(
        new TableView($table),
        new TableModel(),
        new Pagination($pagination, $pageSizeSelector),
        $filter,
        $btnDelItem,
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
}

function initAdmin() {
    const {
        $name,
        $btnSendUser,
        $btnLogin,
        $inputUser,
        $inputPass,
        $alertContainer,
        $headerBody,
        $btnLogout,
        $mainBody,
    } = adminVars()
    new UserController(
        new UserModel(),
        new UserView(
            $name,
            $btnLogin,
            $inputUser,
            $inputPass,
            $btnSendUser,
            $headerBody,
            $mainBody
        ),
        $btnLogin,
        $btnLogout,
        $alertContainer,
        modalLogin
    )
}

function initProduct() {
    const {
        $name,
        $codes,
        $btnAddItem,
        $btnAddUnit,
        $unitsContainer,
        $btnDelUnit,
    } = productVars()

    new ProductController(
        new ProductView($name, $codes, $unitsContainer),
        new ProductModel(),
        $btnAddItem,
        $btnAddUnit,
        $btnDelUnit,
        modalProduct
    )
}
