class UserController {
    constructor(model, view, $Login) {
        this.alert = new Alert($Login)
        this.$Login = $Login
        this.model = model
        this.view = view

        this.model.addUserListener(this.onUserChange)
        this.view.addLoginListener(this.tryLogin)

        model.check()
    }

    tryLogin = async ({ user, pass }) => {
        if (!user || !pass) this.alert.info("Complete los campos", 2000)
        else {
            const userDB = await window.users.get(user, pass)
            if (userDB) {
                user = JSON.parse(JSON.parse(userDB))
                this.$Login.close()
                this.view.clearForm()
                this.model.login(user["nombre"], user["rol"])
            } else this.alert.info("Usuario o contraseña incorrecto(s)", 2000)
        }
    }

    onUserChange = (user, type) => {
        if (user) this.view.login(user, type)
        else this.view.logout()
    }
}
