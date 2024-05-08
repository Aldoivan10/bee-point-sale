function initTabs() {
    const { $tabs, $tabsContent, $btnPrevTab, $btnNextTab } = tabVars()
    const tabCtrl = new TabController(
        $tabs,
        $tabsContent,
        $btnPrevTab,
        $btnNextTab
    ).init()

    window.api.onAddTab(() => tabCtrl.appendTab())
    window.api.onDelTab(() => tabCtrl.deleteTab())
}

window.addEventListener("load", () => {
    window.appAlert = new Alert(document.body)
    initTabs()
})
