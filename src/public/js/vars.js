function initVars() {
    const $btnAdmin = document
        .querySelector("#header")
        .contentDocument.querySelector("#btn-admin")
    const $btnLogin = document.getElementById("btnLogin")
    const $inputUser = document.querySelector("input[placeholder=Usuario]")
    const $inputPass = document.querySelector("input[placeholder=Contraseña]")
    const $toastAdmin = document.querySelector(".toast-admin")

    const $body = document.querySelector("body")

    return { $body, $btnAdmin, $btnLogin, $inputUser, $inputPass, $toastAdmin }
}
