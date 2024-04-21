function initTable() {
    const { $table, $filterName, $filterCode, $pagination, $pageSizeSelector } =
        tableVars()

    const tblController = new TableController(
        new TableView($table),
        new TableModel(),
        new Pagination($pagination, $pageSizeSelector),
        $filterCode,
        $filterName,
        {
            6: (val) => {
                return val.toLocaleString("es-MX", {
                    style: "currency",
                    currency: "MXN",
                })
            },
        }
    ).init()

    return { tblController }
}

function initAdmin(tblController) {
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
    const userController = new UserController(
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
