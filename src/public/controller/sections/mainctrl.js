const updater = (className) => tableCtrl.update(className)
const productApi = window.parent.products
let ctrl = window.parent.productController

const tableCtrl = new PaginedTableController(
    new TableView($table),
    productApi,
    new Pagination($pagination, $pageSize),
    window.parent.appAlert,
    $filter,
    $delItems
)

const menuOpt = new MenuOptions(
    window.parent.productController,
    window.parent.clientController,
    window.parent.cartController
).setPaginedTableController(tableCtrl)

const cartApi = menuOpt.getApi("Venta")

tableCtrl.onEdit(async ($rows) => {
    const $row = $rows[0]
    const id = +$row.querySelector(".hidden").textContent
    const obj = await tableCtrl.api.find(id)
    ctrl.showModal(obj, id)
})

tableCtrl.onDblClick((arr) => {
    const name = arr[1]
    if (name !== "productos") return
    const $dialog = parent.$cart
    const row = arr[0]
    const btn = $dialog.querySelector(".btn-success")
    const input = $dialog.querySelector("input")

    input.value = ""

    $dialog.addEventListener("keyup", (evt) => {
        if (evt.key === "Enter" && input.value) btn.click()
    })
    input.addEventListener("change", () => {
        const val = input.value
        if (val) input.value = Math.min(Math.max(val, 1), +row["Cantidad"])
    })
    input.max = row["Cantidad"]
    btn.onclick = () => {
        const price = +row["Precio de compra"].split("$")[1]
        const item = {
            Producto: row["Nombre"],
            Unidad: row["Unidad"],
            Cantidad: +input.value,
            Precio: price,
            Total: price * +input.value,
        }
        cartApi.add(item)
        $dialog.close()
    }
    $dialog.showModal()
})

$footer.onload = () => {
    const menu = new Menu()
    const doc = $footer.ownerDocument

    const changeView = (view, admin) => {
        const objects = window.parent.document.querySelectorAll("object")
        for (const obj of objects) {
            if (obj.contentWindow === window) {
                if (obj.classList.contains("hidden")) return
                break
            }
        }
        if (admin && menu.admin) menu.click(view)
        else if (!admin) menu.click(view)
    }
    const api = window.parent.api

    api.onDataUpdated(updater)
    api.onChangeView(changeView)

    menu.addListener((opt) => {
        const option = menuOpt.getOption(opt)
        tableCtrl.setConfig(
            option.api,
            option.model,
            option.mapper,
            option.class
        )
        ctrl = option.ctrl
    })
    doc.defaultView.menu = menu

    const classObserver = new MutationObserver((mutations) => {
        const body = mutations[0].target
        if (body.classList.contains("admin")) {
            $footer.contentDocument.body.classList.add("admin")
            menu.setAdmin()
        } else {
            $footer.contentDocument.body.classList.remove("admin")
            menu.setAdmin(false)
        }
    })
    classObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
    })
}
