const updater = (className) => tableCtrl.update(className)

const tableCtrl = new TableController(
    new TableView($table),
    new Pagination($pagination, $pageSize),
    window.parent.appAlert,
    $filter,
    $delItems
)

const menuOpt = new MenuOptions(
    window.parent.$product,
    window.parent.$client
).setTableController(tableCtrl)
let $modal = window.parent.$product

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
        $modal = option.modal
    })
    $footer.ownerDocument.defaultView.menu = menu
}
