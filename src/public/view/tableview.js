class TableView {
    constructor(selector) {
        this.$table = document.querySelector(selector)
    }

    buildHeader(headers) {
        const template = "<td>name</td>"
        const $header = this.$table.querySelector("thead > tr")
        $header.innerHTML = ""
        for (const header of headers) {
            $header.innerHTML += template.replace("name", header)
        }
    }

    buildBody(rows) {
        const colTemplate = "<td>data</td>"
        const $body = this.$table.querySelector("tbody")
        $body.innerHTML = ""
        for (const row of rows) {
            const $row = document.createElement("tr")
            for (const col in row) {
                $row.innerHTML += colTemplate.replace("data", col)
            }
            $body.appendChild($row)
        }
    }
}
