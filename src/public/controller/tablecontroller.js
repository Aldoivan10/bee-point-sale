class TableController {
    constructor(view, model) {
        this.$view = view
        this.$model = model

        model.addHeaderListener(this.onHeaderUpdate)
        model.addDataListener(this.onDataUpdate)
    }

    init() {
        this._getHeaders()
        this._getData()
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
            this.$view.buildBody(data)
        })
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
        this.$view.buildBody(rows)
    }
}
