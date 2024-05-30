class TableView extends Listener {
    constructor($table) {
        super()
        this.$table = $table
        this.$header = $table.querySelector("thead > tr")
        this.$body = $table.querySelector("tbody")
        this.removeChilds = window.parent.removeChilds

        this.currentClass = ""
    }

    setClass(className) {
        if (this.currentClass) this.$table.classList.remove(this.currentClass)
        this.$table.classList.add(className)
        this.currentClass = className
    }

    hideColumns(...indexes) {
        for (const i of indexes) {
            this.$table
                .querySelectorAll(`td:nth-child(${i})`)
                .forEach((el) => el.classList.add("hidden"))
        }
    }

    getClass() {
        return this.currentClass
    }

    buildHeader(headers) {
        const fc = "Seleccionar"
        this.removeChilds(this.$header)
        headers.push("Editar")
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

    getCheckedIds(headers) {
        const checkedRows = Array.from(
            this.$body.querySelectorAll("tr:has(input[type=checkbox]:checked)")
        )
        const indexIds = headers.reduce((arr, val, i) => {
            if (val.includes("id_") || val === "ID")
                arr.push(`td:nth-child(${i + 2})`)
            return arr
        }, [])
        return checkedRows.map((row) =>
            Array.from(
                row.querySelectorAll(`:where(${indexIds.join(",")})`)
            ).map((td) => +td.textContent)
        )
    }

    buildBody(rows, headers) {
        if (rows.length > 0) for (const row of rows) this.addRow(row, headers)
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
        const $edit = button({
            class: "btn-warning btn-sm",
            icon: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z",
        })
        const $td = document.createElement("td")
        $row.classList.add("hover")
        $row.innerHTML = `<td><input type="checkbox" class="checkbox checkbox-sm checkbox-primary" /></td>`
        $td.appendChild($edit)
        $edit.onclick = () => this.notify("main", $row)
        for (const key of keys) {
            if (key === "Editar") $row.appendChild($td)
            else $row.innerHTML += `<td class="hover">${row[key]}</td>`
        }
        this.$body.appendChild($row)
    }

    _createtCol(text) {
        const col = document.createElement("td")
        col.textContent = text
        return col
    }
}
