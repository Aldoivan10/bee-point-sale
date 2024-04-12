const sqlite3 = require("sqlite3").verbose()

module.exports = class DB {
    async init(path) {
        this.db = await new Promise((resolve) => {
            const db = new sqlite3.Database(path, (err) => {
                if (err) new Error(err)
                resolve(db)
            })
        })
        return this
    }

    async fetchProducts() {
        const sql = "SELECT * FROM vista_producto"
        return await this.fetch(sql, [], (data) => {
            const jsonRows = data.map((row) => JSON.parse(row["producto"]))
            const rows = jsonRows.reduce((rows, product) => {
                const row = product.codigos
                const units = product.unidades.reduce((acc, val) => {
                    acc.push([val.cantidad, val.unidad, val.precio_venta])
                    return acc
                }, [])
                row.push(product.nombre)
                row.push(units[0])
                rows.push(row.flat())
                for (const unit of units.slice(1)) {
                    const otherRow = Array.form("".repeat(row.length))
                    otherRow.push(unit)
                    rows.push(otherRow.flat())
                }
                return rows
            }, [])
            return rows
        })
    }

    async fetchCodes() {
        const sql = "SELECT nombre FROM codigo ORDER BY nombre"
        return await this.fetch(sql, [], (rows) => {
            return rows
        })
    }

    async fetch(sql, params = [], action = () => {}) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, async (err, rows) => {
                if (err) {
                    console.log(err)
                    reject([])
                }
                resolve(action(rows))
            })
        })
    }
}
