const tableCtrl = new TableController(
    new TableView($table),
    new Pagination($pagination, $pageSize),
    window.parent.appAlert,
    $filter,
    $delItems
)
const menuOpt = new MenuOptions().setTableController(tableCtrl)
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
    })
    menu.click()
})
