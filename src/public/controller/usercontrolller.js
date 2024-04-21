class UserController {
    constructor(
        userModel,
        userView,
        btnLogin,
        btnLogout,
        alertContainer,
        modalUser
    ) {
        this.alert = new Alert(alertContainer)
        this.$modalUser = modalUser
        this.userModel = userModel
        this.userView = userView

        this.userModel.addUserListener(this.onUserChange)
        this.userView.addLoginListener(this.tryLogin)
        btnLogin.onclick = () => modalUser.showModal()
        btnLogout.onclick = () => userModel.logout()
        userModel.check()
    }

    tryLogin = async ({ user, pass }) => {
        if (!user || !pass) this.alert.info("Complete los campos", 2000)
        else {
            const userDB = await window.users.get(user, pass)
            if (userDB) {
                user = JSON.parse(JSON.parse(userDB))
                this.$modalUser.close()
                this.userView.clearForm()
                this.userModel.login(user["nombre"], user["rol"])
            } else this.alert.info("Usuario o contraseña incorrecto(s)", 2000)
        }
    }

    onUserChange = (user, type) => {
        if (user) this.userView.login(user, type)
        else this.userView.logout()
    }
}