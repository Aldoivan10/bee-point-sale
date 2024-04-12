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

    _remove(arr, item, notifier) {
        const index = typeof item === "string" ? arr.indexOf(item) : item
        const removed = arr[index]
        arr = arrsplice(index, 1)
        notifier(arr, null, removed)
        return arr
    }
}
