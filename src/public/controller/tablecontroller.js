class TableController {
    constructor(view, model, input, mapper) {
        this.$view = view
        this.$model = model
        this.$input = input
        this.$mapper = mapper

        model.addHeaderListener(this.onHeaderUpdate)
        model.addDataListener(this.onDataUpdate)
    }

    init() {
        this._getHeaders()
        this._getData()
        this.$input.addEventListener("input", this.onFilter)
        return this
    }

    async _getHeaders() {
        const codes = await window.codes.get()
        const headers = codes
            .map((code) => code["nombre"])
            .concat(["Nombre", "Cantidad", "Unidad", "Precio"])
        this.$model.setHeaders(headers)
    }

    async _getData() {
        window.products.get().then((data) => {
            this.$model.setData(data)
            this.onDataUpdate(data, null, null)
        })
    }

    onFilter = (evt) => {
        const text = evt.target.value.toLowerCase()
        this.onDataUpdate(this.$model.filter(text), null, null)
    }

    onHeaderUpdate = (headers, added, removed) => {
        if (added) {
        } else if (removed) {
        }
        this.$view.buildHeader(headers)
    }

    onDataUpdate = (rows, added, removed) => {
        if (added) {
        } else if (removed) {
        }
        if (!this.$mapper) this.$view.buildBody(rows)
        else
            this.$view.buildBody(
                rows.map((el) => {
                    return el.map((val, i) => {
                        return this.$mapper[i] ? this.$mapper[i](val) : val
                    })
                })
            )
    }
}
