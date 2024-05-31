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

tableCtrl.onEdit(async ($rows) => {
    const $row = $rows[0]
    const id = +$row.querySelector(".hidden").textContent
    const obj = await tableCtrl.api.find(id)
    ctrl.showModal(obj)
})

const menuOpt = new MenuOptions(
    window.parent.productController,
    window.parent.clientController
).setPaginedTableController(tableCtrl)

$footer.onload = () => {
    const menu = new Menu()

    const changeView = (view) => {
        const objects = window.parent.document.querySelectorAll("object")
        for (const obj of objects) {
            if (obj.contentWindow === window) {
                if (obj.classList.contains("hidden")) return
                break
            }
        }
        menu.click(view)
    }
    const api = window.parent.api

    api.onDataUpdated(updater)
    api.onClientsView(changeView)
    api.onProductsView(changeView)

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
    $footer.ownerDocument.defaultView.menu = menu
}
