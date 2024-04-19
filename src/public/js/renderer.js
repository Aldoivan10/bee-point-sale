window.onload = () => {
    const { $btnAdmin } = initVars()

    $btnAdmin.onclick = () => modal_admin.showModal()

    const productsCtrl = new TableController(
        new TableView("table"),
        new TableModel(),
        new Pagination("#pagination", "#select-num-results"),
        "#filterCode",
        "#filterName",
        {
            6: (val) => {
                return val.toLocaleString("es-MX", {
                    style: "currency",
                    currency: "MXN",
                })
            },
        }
    ).init()
}
