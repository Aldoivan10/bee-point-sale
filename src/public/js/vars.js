function tableVars() {
    const $main = document.getElementById("main").contentDocument
    const $table = $main.getElementById("tableProducts")
    const $filter = $main.getElementById("filter")
    const $pagination = $main.getElementById("productsPagination")
    const $pageSizeSelector = $main.getElementById("select-num-results")
    return { $table, $filter, $pagination, $pageSizeSelector }
}

function adminVars() {
    const $header = document.getElementById("header").contentDocument
    const $main = document.getElementById("main").contentDocument

    const $headerBody = $header.querySelector("body")
    const $name = $header.getElementById("userName")
    const $btnAddItem = $main.getElementById("btnAddItem")
    const $btnDelItem = $main.getElementById("btnDelItem")

    const $btnLogin = $header.getElementById("btnLogin")
    const $btnLogout = $header.getElementById("btnLogout")
    const $btnSendUser = document.getElementById("btnSendUser")
    const $inputUser = document.querySelector("input[placeholder=Usuario]")
    const $inputPass = document.querySelector("input[placeholder=Contraseña]")
    const $alertContainer = document.querySelector(".toast-login")

    const $mainBody = $main.querySelector("body")

    return {
        $name,
        $btnSendUser,
        $btnLogin,
        $inputUser,
        $inputPass,
        $alertContainer,
        $btnAddItem,
        $btnDelItem,
        $headerBody,
        $btnLogout,
        $mainBody,
    }
}
