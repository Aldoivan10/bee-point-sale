class UserModel {
    constructor() {
        this.get = window.parent.getVal
        this.del = window.parent.delVal
        this.set = window.parent.setVal
        this.userListeners = []
    }

    check() {
        const userName = this.get("user")
        if (userName) this.login(userName, this.get("type"))
        return this
    }

    login(name, type) {
        this.set("user", name)
        this.set("type", type)
        this.notify(name, type)
    }

    logout() {
        this.del("user")
        this.del("type")
        this.notify("", "")
    }

    addUserListener(listener) {
        this.userListeners.push(listener)
    }

    notify(name, type) {
        this.userListeners.forEach((listener) => listener(name, type))
    }
}
