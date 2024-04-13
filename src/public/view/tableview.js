class TableView {
    constructor(selector) {
        const $table = document.querySelector(selector)
        this.$header = $table.querySelector("thead > tr")
        this.$body = $table.querySelector("tbody")
    }

    buildHeader(headers) {
        removeChilds(this.$header)
        for (const header of headers) {
            const col = this._createtCol(header)
            this.$header.appendChild(col)
        }
    }

    buildBody(rows) {
        for (const row of rows) {
            this.addRow(row)
        }
    }

    cleanRows() {
        removeChilds(this.$body)
    }

    addRow(row) {
        const $row = document.createElement("tr")
        for (const column of row) {
            $row.innerHTML += `<td class="hover">${column}</td>`
        }
        this.$body.appendChild($row)
    }

    _createtCol(text) {
        const col = document.createElement("td")
        col.textContent = text
        return col
    }
}
