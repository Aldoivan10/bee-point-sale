class Listener {
    constructor(...keys) {
        this.listeners = {}
        if (keys.length === 0) keys = ["main"]
        for (const key of keys) this.listeners[key] = []
    }

    addListener(listener, key = "main") {
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
