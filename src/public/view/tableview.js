class TableView {
    constructor($table) {
        this.$header = $table.querySelector("thead > tr")
        this.$body = $table.querySelector("tbody")
        this.removeChilds = window.parent.removeChilds
    }

    buildHeader(headers) {
        const fc = "Seleccionar"
        this.removeChilds(this.$header)
        for (const header of [fc].concat(headers)) {
            const col = this._createtCol(header)
            if (header === fc)
                col.innerHTML = `
                    <td>
                        <div class="form-control">
                            <label class="cursor-pointer label">
                                <input type="checkbox" class="checkbox checkbox-secondary me-2 bg-secondary/25" />
                                ${fc}
                            </label>
                        </div>
                    </td>
                `
            this.$header.appendChild(col)
        }
    }

    getChecks(checked = false) {
        if (checked)
            return this.$body.querySelectorAll("input[type=checkbox]:checked")
        const checks = [
            this.$header.querySelector("input[type=checkbox]"),
            ...this.$body.querySelectorAll("input[type=checkbox]"),
        ]
        return checks
    }

    getCheckedRows() {
        return Array.from(
            this.$body.querySelectorAll("tr:has(input[type=checkbox]:checked)")
        )
    }

    buildBody(rows, headers) {
        if (rows.length > 0)
            for (const row of rows) {
                this.addRow(row, headers)
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
        this.removeChilds(this.$body)
    }

    addRow(row, keys) {
        const $row = document.createElement("tr")
        $row.classList.add("hover")
        $row.innerHTML = `<td><input type="checkbox" class="checkbox checkbox-sm checkbox-primary" /></td>`
        for (const key of keys)
            $row.innerHTML += `<td class="hover">${row[key]}</td>`
        this.$body.appendChild($row)
    }

    _createtCol(text) {
        const col = document.createElement("td")
        col.textContent = text
        return col
    }
}
