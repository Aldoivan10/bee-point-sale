class TableView {
    constructor(table) {
        this.$header = table.querySelector("thead > tr")
        this.$body = table.querySelector("tbody")
    }

    buildHeader(headers) {
        removeChilds(this.$header)
        for (const header of headers) {
            const col = this._createtCol(header)
            this.$header.appendChild(col)
        }
    }

    buildBody(rows) {
        if (rows.length > 0)
            for (const row of rows) {
                this.addRow(row)
            }
        else this.setEmpty()
    }

    setEmpty() {
        const $row = document.createElement("tr")
        const $col = document.createElement("td")
        $col.textContent = "No se encontraron resultados"
        $col.setAttribute("colspan", "100%")
        $col.classList.add("text-center")
        $row.appendChild($col)
        this.$body.appendChild($row)
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
