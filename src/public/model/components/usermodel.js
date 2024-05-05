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
        saveVal("user", name)
        saveVal("type", type)
        this.notify(name, type)
    }

    logout() {
        delVal("user")
        delVal("type")
        this.notify("", "")
    }

    addUserListener(listener) {
        this.userListeners.push(listener)
    }

    notify(name, type) {
        this.userListeners.forEach((listener) => listener(name, type))
    }
}
