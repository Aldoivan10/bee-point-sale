function tableVars() {
    const container = document.querySelector("#main").contentDocument
    const $table = container.getElementById("tableProducts")
    const $filterName = container.getElementById("filterName")
    const $filterCode = container.getElementById("filterCode")
    const $pagination = container.getElementById("productsPagination")
    const $pageSizeSelector = container.getElementById("select-num-results")
    return { $table, $filterName, $filterCode, $pagination, $pageSizeSelector }
}

function adminVars() {
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
