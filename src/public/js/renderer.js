const productsCtrl = new TableController(
    new TableView("table"),
    new TableModel(),
    document.getElementById("search"),
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
