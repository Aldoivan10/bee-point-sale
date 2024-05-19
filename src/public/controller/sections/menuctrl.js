class Menu extends Listener {
    constructor($menu) {
        super()
        this.$buttons = Array.from($menu.children)
        this.$buttons.forEach((btn) => (btn.onclick = this.onOptionClick))
    }

    click(index = 0) {
        if (typeof index === "string")
            this.$buttons.find((btn) => btn.dataset.tip === index).click()
        else this.$buttons[index].click()
    }

    onOptionClick = (evt) => {
        const $opt = evt.target
        this.$buttons.forEach((div) => div.classList.remove("active"))
        $opt.classList.add("active")
        this.notify("main", $opt.dataset.tip)
    }
}

class MenuOptions {
    constructor(productModal, clientModal) {
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
                modal: productModal,
            },
            Clientes: {
                api: window.parent.clients,
                model: new TableModel(),
                mapper: {},
                class: "clientes",
                modal: clientModal,
            },
        }
    }

    setTableController(ctrl, opt = "Productos") {
        this.ctrl = ctrl
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

    changeOption(opt) {
        const option = this.options[opt]
        this.ctrl.setConfig(
            option.api,
            option.model,
            option.mapper,
            option.class
        )
    }
}
