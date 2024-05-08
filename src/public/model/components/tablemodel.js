class TableModel {
    constructor(headerBuilder) {
        this.data = []
        this.headers = []
        this.dataListeners = []
        this.headerListeners = []
        this.headerBuilder = headerBuilder
    }

    setHeaders(headers) {
        this.headers = headers
        this.notifyHeaderUpdate(null, null)
    }

    setData(data) {
        this.data = data
        this.notifyDataUpdate(null, null)
    }

    removeHeader(header) {
        this.headers = this._remove(
            this.headers,
            header,
            this.notifyHeaderUpdate
        )
    }

    removeRow(row) {
        this.data = this._remove(this.data, row, this.notifyDataUpdate)
    }

    addRow(row) {
        this.data.push(row)
        this.notifyDataUpdate(row, null)
    }

    addHeader(header) {
        this.headers.push(header)
        this.notifyDataUpdate(row, null)
    }

    notifyHeaderUpdate(added, removed) {
        this.headerListeners.forEach((listener) =>
            listener(this.headers, added, removed)
        )
    }

    notifyDataUpdate(added, removed) {
        this.dataListeners.forEach((listener) =>
            listener(this.data, added, removed)
        )
    }

    addHeaderListener(listener) {
        this.headerListeners.push(listener)
    }

    addDataListener(listener) {
        this.dataListeners.push(listener)
    }

    filter(str) {
        const filtered = this.data.filter((row) => {
            const cols = row.slice(0, 4)
            for (const col of cols) {
                if (col.toLowerCase().includes(str)) return true
            }
            return false
        })
        return filtered
    }

    _remove(arr, item, notifier) {
        const index = typeof item === "string" ? arr.indexOf(item) : item
        const removed = arr[index]
        arr = arrsplice(index, 1)
        notifier(arr, null, removed)
        return arr
    }
}

class ProductModel extends TableModel {
    setHeaders(data) {
        const obj = data[0]
        let keys = Object.keys(obj)
        const other = Object.keys(obj.unidades[0])
        keys = keys.slice(0, keys.length - 1)
        super.setHeaders(keys.concat(other))
    }

    setData(data) {
        const mappedRows = data.reduce((rows, row) => {
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
                    obj[key] = unit[key]
                }
                obj["id"] = row["id"]
                accRows.push({ ...base, ...obj })
            }

            return rows.concat(accRows)
        }, [])
        /* const bodyRows = mappedRows.reduce((rows, obj) => {
            const row = [obj["id"]]
            for (const header of this.headers) row.push(obj[header])
            rows.push(row)
            return rows
        }, []) */

        super.setData(mappedRows)
    }
}
