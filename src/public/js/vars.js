function tableVars() {
    const $main = document.getElementById("main").contentDocument
    const $table = $main.getElementById("tableProducts")
    const $filter = $main.getElementById("filter")
    const $pagination = $main.getElementById("productsPagination")
    const $pageSizeSelector = $main.getElementById("select-num-results")
    const $btnDelItem = $main.getElementById("btnDeleteUnits")
    return { $table, $filter, $pagination, $pageSizeSelector, $btnDelItem }
}

function adminVars() {
    const $headerDoc = $header.contentDocument
    const $mainDoc = $main.contentDocument

    const $headerBody = $header.querySelector("body")
    const $name = $headerDoc.getElementById("userName")

    const $btnLogin = $header.getElementById("btnLogin")
    const $btnLogout = $header.getElementById("btnLogout")
    const $btnSendUser = document.getElementById("btnSendUser")
    const $inputUser = document.querySelector("input[placeholder=Usuario]")
    const $inputPass = document.querySelector("input[placeholder=Contraseña]")

    const $mainBody = $main.querySelector("body")

    return {
        $name,
        $btnSendUser,
        $btnLogin,
        $inputUser,
        $inputPass,
        $headerBody,
        $btnLogout,
        $mainBody,
    }
}

function productVars() {
    const $main = document.getElementById("main").contentDocument
    const $name = modalProduct.querySelector("input[placeholder=Nombre]")
    const $codes = modalProduct.querySelector("#codesContainer")
    const $btnAddItem = $main.getElementById("btnAddItem")
    const $btnAddUnit = document.getElementById("btnAddUnit")
    const $unitsContainer = document.getElementById("unitsContainer")

    return {
        $name,
        $codes,
        $btnAddItem,
        $btnAddUnit,
        $unitsContainer,
    }
}

function tabVars() {
    const $headerDoc = $header.contentDocument
    const $tabs = $headerDoc.getElementById("$tabs")
    const $btnPrevTab = $headerDoc.getElementById("$btnPrevTab")
    const $btnNextTab = $headerDoc.getElementById("$btnNextTab")

    return { $tabs, $tabsContent, $btnPrevTab, $btnNextTab }
}
