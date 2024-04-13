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
        removeChilds(this.$body)
        for (const row of rows) {
            this.addRow(row)
        }
    }

    addRow(row) {
        const $row = document.createElement("tr")
        for (const column of row) {
            $row.innerHTML += `<td>${column}</td>`
        }
        this.$body.appendChild($row)
    }

    _createtCol(text) {
        const col = document.createElement("td")
        col.textContent = text
        return col
    }
}
