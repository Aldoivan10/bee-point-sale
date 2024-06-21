class CartApi {
    constructor() {
        this.items = []
    }

    get() {
        return new Promise((resolve) => resolve(this.items))
    }

    total() {
        return new Promise((resolve) => resolve(0))
    }

    add(item) {
        const index = this.items.findIndex(
            (i) => i["Producto"] === item["Producto"]
        )
        if (index != -1) return
        this.items.push(item)
    }

    delete(items) {
        console.log(items)
        const del = this.items.indexOf((i) => i === item)
        if (del > -1) this.items.slice(del, 1)
    }

    amount() {
        return this.items.reduce(
            (acc, item) => acc + +item.Total.split("$")[1],
            0
        )
    }
}
