class MenuOptions {
    constructor() {
        this.options = {
            Productos: {
                api: window.parent.products,
                model: new ProductModel(),
                mapper: {
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
                },
                class: "productos",
            },
            Clientes: {
                api: window.parent.clients,
                model: new TableModel(),
                mapper: {},
                class: "clientes",
            },
        }
    }

    setTableController(ctrl, opt = "Productos") {
        for (const key of Object.keys(this.options)) {
            const opt = this.options[key]
            opt.model.addHeaderListener(ctrl.onHeaderUpdate)
            opt.model.addDataListener(ctrl.onDataUpdate)
        }
        const option = this.options[opt]
        ctrl.setConfig(option.api, option.model, option.mapper, option.class)
        return this
    }

    getOption(opt) {
        return this.options[opt]
    }
}
