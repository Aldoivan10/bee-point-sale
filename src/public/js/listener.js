class Listener {
    constructor(...keys) {
        console.log("??????????")
        this.listeners = {}
        if (!keys) keys = ["main"]
        for (const key of keys) this.listeners[key] = []
    }

    addListener(listener, key = "main") {
        console.log(this.listeners)
        this.listeners[key].push(listener)
    }

    removeListener(listener, key = "main") {
        const index = this.listeners[key].indexOf(listener)
        if (index > -1) this.listeners[key].splice(index, 1)
    }

    notify(key = "main", ...args) {
        this.listeners[key].forEach((listener) => listener(args))
    }
}
