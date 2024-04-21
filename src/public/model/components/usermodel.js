class UserModel {
    constructor() {
        this.userListeners = []
    }

    check() {
        const userName = localStorage.getItem("user")
        if (userName) this.login(userName, localStorage.getItem("type"))
        return this
    }

    login(name, type) {
        localStorage.setItem("user", name)
        localStorage.setItem("type", type)
        this.notify(name, type)
    }

    logout() {
        localStorage.removeItem("user")
        localStorage.removeItem("type")
        this.notify("", "")
    }

    addUserListener(listener) {
        this.userListeners.push(listener)
    }

    notify(name, type) {
        this.userListeners.forEach((listener) => listener(name, type))
    }
}
