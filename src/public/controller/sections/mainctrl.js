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

$footer.addEventListener("load", () => {
    const $menu = $footer.contentDocument.getElementById("$menu")
    const menu = new Menu($menu)
    menu.addListenerOpt((opt) => {
        const option = menuOpt.getOption(opt)
        tableCtrl.setConfig(
            option.api,
            option.model,
            option.mapper,
            option.class
        )
        $modal = option.modal
    })
    menu.click()
})
