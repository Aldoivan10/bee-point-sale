class CartApi {
    constructor() {
        this.items = []
        this.clear()
    }

    save() {
        this.clear()
    }

    get() {
        return new Promise((resolve) => resolve(this.items))
    }

    total() {
        return new Promise((resolve) => resolve(this.items.length))
    }

    add(item) {
        const index = this.items.findIndex(
            (i) => i["Producto"] === item["Producto"]
        )
        if (index != -1) return
        item["ID"] = crypto.randomUUID()
        this.items.push(item)
    }

    delete(item) {
        const del = this.items.indexOf((i) => i === item)
        if (del > -1) this.items.slice(del, 1)
    }

    clear() {
        this.items = []
        this.user = ""
        this.entityt = ""
    }
}
