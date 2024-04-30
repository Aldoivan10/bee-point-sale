class TableView {
    constructor(table) {
        this.$header = table.querySelector("thead > tr")
        this.$body = table.querySelector("tbody")
    }

    buildHeader(headers) {
        const fc = "Seleccionar"
        removeChilds(this.$header)
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
        return this.$body.querySelectorAll(
            "tr:has(input[type=checkbox]:checked)"
        )
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
        $row.id = row[0]
        $row.classList.add("hover")
        $row.innerHTML = `<td><input type="checkbox" class="checkbox checkbox-sm checkbox-primary" /></td>`
        for (const column of row.slice(1))
            $row.innerHTML += `<td class="hover">${column}</td>`
        this.$body.appendChild($row)
    }

    _createtCol(text) {
        const col = document.createElement("td")
        col.textContent = text
        return col
    }
}
