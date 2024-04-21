class UserView {
    constructor(
        name,
        btnLogin,
        inputUser,
        inputPass,
        btnSendUser,
        btnAddItem,
        btnDelItem,
        headerBody
    ) {
        this.$name = name
        this.$btnLogin = btnLogin
        this.$inputPass = inputPass
        this.$inputUser = inputUser
        this.$btnAddItem = btnAddItem
        this.$btnDelItem = btnDelItem
        this.$btnSendUser = btnSendUser
        this.$headerBody = headerBody
        this.loginListeners = []

        inputUser.onkeypress = this.onFormComplete
        inputPass.onkeypress = this.onFormComplete
        btnSendUser.onclick = (evt) => {
            evt.preventDefault()
            this.notify()
        }
    }

    login(name, type) {
        if (type === "admin") this.$headerBody.classList.add("admin")
        this.setName(name)
    }

    logout() {
        this.$headerBody.classList.remove("admin")
        this.setName("")
    }

    setName(name) {
        this.$name.textContent = name
    }

    getUser() {
        const user = this.$inputUser.value
        const pass = this.$inputPass.value
        return { user, pass }
    }

    onFormComplete = (evt) => {
        if (evt.code === "Enter") this.$btnSendUser.click()
    }

    addLoginListener(listener) {
        this.loginListeners.push(listener)
    }

    clearForm() {
        this.$inputPass.value = ""
        this.$inputUser.value = ""
    }

    notify() {
        this.loginListeners.forEach((listener) => listener(this.getUser()))
    }
}