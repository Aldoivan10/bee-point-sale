window.onload = () => {
    const { $body, $btnAdmin, $btnLogin, $inputUser, $inputPass, $toastAdmin } =
        initVars()

    const adminAlert = new AlertController($toastAdmin)

    const productsCtrl = new TableController(
        new TableView("table"),
        new TableModel(),
        new Pagination("#pagination", "#select-num-results"),
        "#filterCode",
        "#filterName",
        {
            6: (val) => {
                return val.toLocaleString("es-MX", {
                    style: "currency",
                    currency: "MXN",
                })
            },
        }
    ).init()

    $inputUser.onkeypress = (evt) => {
        if (evt.code === "Enter") $btnLogin.click()
    }
    $inputPass.onkeypress = (evt) => {
        if (evt.code === "Enter") $btnLogin.click()
    }
    $btnAdmin.onclick = () => modal_admin.showModal()
    $btnLogin.onclick = async (evt) => {
        evt.preventDefault()
        const user = $inputUser.value
        const pass = $inputPass.value
        if (!user || !pass) adminAlert.info("Complete los campos", 2000)
        else {
            const $user = await window.users.get(user, pass)
            if ($user) {
                modal_admin.close()
                $body.classList.add("admin")
            } else adminAlert.info("Usuario o contraseña incorrecto(s)", 2000)
        }
    }
}
