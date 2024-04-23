class TableModel {
    constructor() {
        this.data = []
        this.headers = []
        this.dataListeners = []
        this.headerListeners = []
    }

    setHeaders(headers) {
        this.headers = headers
        this.notifyHeaderUpdate(null, null)
    }

    setData(data) {
        const headers = this.getHeadersFromObject(data[0])
        this.data = data
        this.setHeaders(headers)
        this.notifyDataUpdate(null, null)
    }

    getHeadersFromObject(obj) {
        let keys = Object.keys(obj)
        const other = Object.keys(obj.unidades[0])
        keys = keys.slice(0, keys.length - 1)
        return keys.concat(other)
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
