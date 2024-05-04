class TableController {
    constructor(
        view,
        model,
        pagination,
        filter,
        btnDelItem,
        modalConfirm,
        mapper
    ) {
        this.$view = view
        this.$model = model
        this.mapper = mapper
        this.$pagination = pagination

        this.filter = null
        this.filterTimer = null
        this.filterWaitingTime = 500

        model.addHeaderListener(this.onHeaderUpdate)
        model.addDataListener(this.onDataUpdate)
        pagination.addListener(this.onPaginationUpdate)
        filter.oninput = this.onFilter
        btnDelItem.onclick = this.onItemDelete
    }

    init() {
        this._getData(this.$pagination.size(), this.$pagination.offset())
        this._buildPagination(this.filter)
        return this
    }

    async _getData(pageSize, offset, filter = null) {
        this.$view.cleanRows()
        window.products.get(pageSize, offset, filter).then((data) => {
            this.$model.setData(data)
        })
    }

    async _buildPagination(filter = null) {
        window.products.total(filter).then((total) => {
            this.$pagination.buildPagination(total)
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
                this.$pagination.size(),
                this.$pagination.offset(),
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
        this.$view.buildHeader(headers)
    }

    onDataUpdate = (rows, added, removed) => {
        if (added) {
        } else if (removed) {
        }
        if (!this.mapper) this.$view.buildBody(rows)
        else {
            const mappedRows = rows.reduce((rows, row) => {
                const keys = Object.keys(row)
                const base = keys.reduce((acc, key) => {
                    if (key === "unidades" || key === "id") return acc
                    return { ...acc, [key]: row[key] }
                }, {})
                const units = row.unidades
                const accRows = []
                for (const unit of units) {
                    const keys = Object.keys(unit)
                    const obj = {}
                    for (const key of keys) {
                        const func = this.mapper[key]
                        if (func) {
                            obj[key] = func(unit[key])
                            continue
                        }
                        obj[key] = unit[key]
                    }
                    obj["id"] = row["id"]
                    accRows.push({ ...base, ...obj })
                }

                return rows.concat(accRows)
            }, [])

            const bodyRows = mappedRows.reduce((rows, obj) => {
                const row = [obj["id"]]
                for (const header of this.$model.headers) row.push(obj[header])
                rows.push(row)
                return rows
            }, [])

            this.$view.buildBody(bodyRows)

            const checksArr = this.$view.getChecks()
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
    }

    onItemDelete = () => {
        confirmDialog(
            "Eliminar productos",
            "¿Desea eliminar los productos seleccionados?. Ya no podrán ser recuperados.",
            () => {
                const rows = this.$view.getCheckedRows()
                console.log(rows)
            }
        )
    }
}
