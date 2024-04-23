function initTable() {
    const { $table, $filterName, $filterCode, $pagination, $pageSizeSelector } =
        tableVars()

    new TableController(
        new TableView($table),
        new TableModel(),
        new Pagination($pagination, $pageSizeSelector),
        $filterCode,
        $filterName,
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
        $btnAddItem,
        $btnDelItem,
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
            $btnAddItem,
            $btnDelItem,
            $headerBody,
            $mainBody
        ),
        $btnLogin,
        $btnLogout,
        $alertContainer,
        modalUser
    )
}
