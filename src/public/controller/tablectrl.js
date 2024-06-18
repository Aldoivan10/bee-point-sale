class TableController {
    constructor(view, api, alerts, $delItems, model = null, appAlert = null) {
        this.api = api
        this.view = view
        this.model = model
        this.alerts = alerts
        this.appAlert = appAlert
        $delItems.onclick = this.onItemDelete
    }

    init() {
        this.model.addHeaderListener(this.onHeaderUpdate)
        this.model.addDataListener(this.onDataUpdate)
        return this
    }

    async getData() {
        this.view.cleanRows()
        this.api.get().then((data) => {
            if (data.length > 1) return
            this.model.setHeaders(data)
            this.model.setData(data)
        })
    }

    onItemDelete = () => {
        window.parent.confirmDialog(
            "Eliminar productos",
            "¿Desea eliminar los elementos seleccionados?. Ya no podrán ser recuperados.",
            async () => {
                const ids = this.view.getCheckedIds(this.model.headers)
                const res = await this.api.delete(ids)
                this.showAlert(res, this.appAlert ? this.appAlert : this.alerts)
            }
        )
    }

    update() {
        this.getData()
    }

    onHeaderUpdate = (headers) => {
        this.view.buildHeader(headers)
    }

    onDataUpdate = (rows) => {
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

    onEdit(listener) {
        this.view.addListener(listener)
    }

    showAlert(alertObj, alerts) {
        const alert = alerts ? alerts : this.alerts
        if (alertObj.status === "success") {
            alert.success(alertObj.msg)
        } else {
            alert.error(alertObj.msg)
            console.log(alertObj.data)
        }
    }
}

class PaginedTableController extends TableController {
    constructor(view, api, pagination, alerts, $filter, $delItems) {
        super(view, api, alerts, $delItems)
        this.pagination = pagination
        this.$filter = $filter

        this.filter = null
        this.filterTimer = null
        this.filterWaitingTime = 500

        pagination.addListener(this.onPaginationUpdate)
        $filter.oninput = this.onFilter
    }

    build() {
        this.getData(this.pagination.size(), this.pagination.offset())
        this.buildPagination(this.filter)
    }

    setConfig(api, model, mapper, className) {
        if (this.view.getClass() === className) return
        this.api = api
        this.model = model
        this.mapper = mapper
        if (this.$filter.value) this.$filter.value = ""
        else this.build()
        this.view.setClass(className)
    }

    async getData(pageSize, offset, filter = null) {
        this.view.cleanRows()
        this.api.get(pageSize, offset, filter).then((data) => {
            if (data.length !== 0) {
                const endOfCodes = this.model.setHeaders(data)
                this.model.setData(data)
                if (endOfCodes)
                    this.view.hideColumns(endOfCodes, endOfCodes + 2)
            } else this.view.setEmpty()
        })
    }

    async buildPagination(filter = null) {
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
            this.getData(
                this.pagination.size(),
                this.pagination.offset(),
                this.filter
            )
            this.buildPagination(this.filter)
        }, this.filterWaitingTime)
    }

    onPaginationUpdate = (args) => this.getData(args[0], args[1], this.filter)

    onDataUpdate = (rows) => {
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

    update(className) {
        if (className === this.view.getClass()) {
            this.pagination.reset()
            this.build()
        }
    }
}
