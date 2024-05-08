class TableController {
    constructor(
        view,
        model,
        pagination,
        $filter,
        $delItems,
        alerts,
        mapper = {}
    ) {
        this.view = view
        this.model = model
        this.mapper = mapper
        this.pagination = pagination

        this.filter = null
        this.filterTimer = null
        this.filterWaitingTime = 500

        this.alerts = alerts
        this.api = window.parent.products

        model.addHeaderListener(this.onHeaderUpdate)
        model.addDataListener(this.onDataUpdate)
        pagination.addListener(this.onPaginationUpdate)
        $filter.oninput = this.onFilter
        $delItems.onclick = this.onItemDelete
    }

    init() {
        this._getData(this.pagination.size(), this.pagination.offset())
        this._buildPagination(this.filter)
        return this
    }

    setApi(api) {
        this.api = api
    }

    async _getData(pageSize, offset, filter = null) {
        this.view.cleanRows()
        this.api.get(pageSize, offset, filter).then((data) => {
            this.model.setHeaders(data)
            this.model.setData(data)
        })
    }

    async _buildPagination(filter = null) {
        this.api.total(filter).then((total) => {
            this.pagination.buildPagination(total)
        })
    }

    onFilter = (evt) => {
        this.filter = evt.target.value.toLowerCase()
        this.initFilterTimer()
    }

    initFilterTimer() {
        if (this.filterTimer) {
            clearTimeout(this.filterTimer)
            this.filterTimer = null
        }
        this.filterTimer = setTimeout(() => {
            this._getData(
                this.pagination.size(),
                this.pagination.offset(),
                this.filter
            )
            this._buildPagination(this.filter)
        }, this.filterWaitingTime)
    }

    onPaginationUpdate = (pageSize, offset) =>
        this._getData(pageSize, offset, this.filter)

    onHeaderUpdate = (headers, added, removed) => {
        if (added) {
        } else if (removed) {
        }
        this.view.buildHeader(headers)
    }

    onDataUpdate = (rows, added, removed) => {
        if (added) {
        } else if (removed) {
        }

        const mapKeys = Object.keys(this.mapper)
        if (mapKeys.length > 0) {
            for (const row of rows) {
                for (const key of mapKeys) {
                    row[key] = this.mapper[key](row[key])
                }
            }
        }

        this.view.buildBody(rows, this.model.headers)

        const checksArr = this.view.getChecks()
        const checks = checksArr.slice(1)
        const mainCheck = checksArr[0]
        mainCheck.onchange = () => {
            checks.forEach((el) => (el.checked = mainCheck.checked))
        }

        checks.forEach((el) => {
            el.onchange = () =>
                (mainCheck.checked = checks.every((el) => el.checked))
        })
    }

    onItemDelete = () => {
        window.parent.confirmDialog(
            "Eliminar productos",
            "¿Desea eliminar los elementos seleccionados?. Ya no podrán ser recuperados.",
            async () => {
                const ids = this.view.getCheckedIds(this.model.headers)
                console.log(ids)
                /* const res = await this.api.delete(ids)
                if (res.status === "success") {
                    this.alerts.success(res.msg)
                    this.init()
                } else {
                    alerts.error(res.msg)
                    console.log(res.data)
                } */
            }
        )
    }
}
