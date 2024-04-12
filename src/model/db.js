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
        return await this.fetch(
            sql,
            [],
            (action = (rows) => {
                return rows.map((row) => JSON.parse(row["producto"]))
            })
        )
    }

    async fetchCodes() {
        const sql = "SELECT * FROM vista_producto"
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
