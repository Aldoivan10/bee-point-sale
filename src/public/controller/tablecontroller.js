class TableController {
    constructor(view, model, pagination, filter, mapper) {
        this.$view = view
        this.$model = model
        this.$mapper = mapper
        this.$pagination = pagination

        model.addHeaderListener(this.onHeaderUpdate)
        model.addDataListener(this.onDataUpdate)
        pagination.addListener(this.onPaginationUpdate)
    }

    init() {
        this._getHeaders()
        this._getData(this.$pagination.size(), this.$pagination.offset())
        this._buildPagination()
        return this
    }

    async _getHeaders() {
        const codes = await window.codes.get()
        const headers = codes
            .map((code) => code["nombre"])
            .concat(["Nombre", "Cantidad", "Unidad", "Precio"])
        this.$model.setHeaders(headers)
    }

    async _getData(pageSize, offset) {
        this.$view.cleanRows()
        window.products.get(pageSize, offset).then((data) => {
            this.$model.setData(data)
        })
    }

    async _buildPagination() {
        window.products.total().then((total) => {
            this.$pagination.buildPagination(total)
        })
    }

    onFilter = (evt) => {
        const text = evt.target.value.toLowerCase()
        this.onDataUpdate(this.$model.filter(text), null, null)
    }

    onPaginationUpdate = (pageSize, offset) => this._getData(pageSize, offset)

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
