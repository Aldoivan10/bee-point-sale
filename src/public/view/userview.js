class UserView {
    constructor($name, $headerBody, $indexBody, $pass, $user, $sendUser) {
        this.class = "admin"

        this.$name = $name
        this.$pass = $pass
        this.$user = $user
        this.$sendUser = $sendUser
        this.$indexBody = $indexBody
        this.$headerBody = $headerBody

        this.loginListeners = []

        $pass.onkeypress = this.onFormComplete
        $user.onkeypress = this.onFormComplete
        $sendUser.onclick = (evt) => {
            evt.preventDefault()
            this.notify()
        }
    }

    login(name, type) {
        if (type === this.class) {
            this.$headerBody.classList.add(this.class)
            this.$indexBody.classList.add(this.class)
        }
        this.setName(name)
    }

    logout() {
        this.$headerBody.classList.remove(this.class)
        this.$indexBody.classList.remove(this.class)
        this.setName("")
    }

    setName(name) {
        this.$name.textContent = name
    }

    getUser() {
        const user = this.$user.value
        const pass = this.$pass.value
        return { user, pass }
    }

    onFormComplete = (evt) => {
        if (evt.code === "Enter") this.$sendUser.click()
    }

    addLoginListener(listener) {
        this.loginListeners.push(listener)
    }

    clearForm() {
        this.$pass.value = ""
        this.$user.value = ""
    }

    notify() {
        this.loginListeners.forEach((listener) => listener(this.getUser()))
    }
}
