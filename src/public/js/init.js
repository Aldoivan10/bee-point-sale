function initTable() {
    const { $table, $filter, $pagination, $pageSizeSelector } = tableVars()

    new TableController(
        new TableView($table),
        new TableModel(),
        new Pagination($pagination, $pageSizeSelector),
        $filter,
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
            $headerBody,
            $mainBody
        ),
        $btnLogin,
        $btnLogout,
        $alertContainer,
        modalUser
    )
}
