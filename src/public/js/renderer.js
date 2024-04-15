const productsCtrl = new TableController(
    new TableView("table"),
    new TableModel(),
    new Pagination("#pagination", "#select-num-results"),
    "#filterCode",
    "#filterName",
    [
        ,
        ,
        ,
        ,
        ,
        ,
        (val) => {
            return val.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
            })
        },
    ]
).init()
