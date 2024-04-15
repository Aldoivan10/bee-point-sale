class TableController {
    constructor(view, model, pagination, filterCode, filterName, mapper) {
        this.$view = view
        this.$model = model
        this.$mapper = mapper
        this.$pagination = pagination

        this.filterCode = null
        this.filterName = null
        this.filterTimer = null
        this.filterWaitingTime = 500

        model.addHeaderListener(this.onHeaderUpdate)
        model.addDataListener(this.onDataUpdate)
        pagination.addListener(this.onPaginationUpdate)
        document.querySelector(filterCode).oninput = this.onFilterCode
        document.querySelector(filterName).oninput = this.onFilterName
    }

    init() {
        this._getHeaders()
        this._getData(this.$pagination.size(), this.$pagination.offset())
        this._buildPagination(this.filterCode, this.filterName)
        return this
    }

    async _getHeaders() {
        const codes = await window.codes.get()
        const headers = codes
            .map((code) => code["nombre"])
            .concat(["Nombre", "Cantidad", "Unidad", "Precio"])
        this.$model.setHeaders(headers)
    }

    async _getData(pageSize, offset, filterCode = null, filterName = null) {
        this.$view.cleanRows()
        window.products
            .get(pageSize, offset, filterCode, filterName)
            .then((data) => {
                this.$model.setData(data)
            })
    }

    async _buildPagination(filterCode = null, filterName = null) {
        window.products.total(filterCode, filterName).then((total) => {
            this.$pagination.buildPagination(total)
        })
    }

    onFilterCode = (evt) => {
        this.filterCode = evt.target.value.toLowerCase()
        this.initFilterTimer()
    }

    onFilterName = (evt) => {
        this.filterName = evt.target.value.toLowerCase()
        this.initFilterTimer()
    }

    initFilterTimer() {
        if (this.filterTimer) {
            clearTimeout(this.filterTimer)
            this.filterTimer = null
        }
        this.filterTimer = setTimeout(() => {
            this._getData(
                this.$pagination.size(),
                this.$pagination.offset(),
                this.filterCode,
                this.filterName
            )
            this._buildPagination(this.filterCode, this.filterName)
        }, this.filterWaitingTime)
    }

    onPaginationUpdate = (pageSize, offset) =>
        this._getData(pageSize, offset, this.filterCode, this.filterName)

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
