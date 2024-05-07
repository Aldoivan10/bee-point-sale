function initTabs() {
    const { $tabs, $tabsContent } = tabVars()
    const tabCtrl = new TabController($tabs, $tabsContent).init()

    window.api.onAddTab(() => tabCtrl.appendTab())
    window.api.onDelTab(() => tabCtrl.deleteTab())
}

window.addEventListener("load", () => {
    initTabs()

    /* const mainAlerts = new Alert(document.body) */
    /*  initAdmin() */
    /* initTable(mainAlerts) */
    /* initProduct() */
})
