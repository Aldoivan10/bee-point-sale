const sqlite3 = require("sqlite3").verbose()

module.exports = class DB {
    async init(path) {
        this.db = await new Promise((resolve) => {
            const db = new sqlite3.Database(path, (err) => {
                if (err) new Error(err)
                resolve(db)
            })
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

    async query(sql, params = [], action = () => {}, error = () => {}) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, async (err) => {
                if (err) reject(error(err))
                resolve(action())
            })
        })
    }
}
