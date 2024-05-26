const parent = window.parent
const sections = [
    { el: $users, api: parent.users },
    { el: $codes, api: parent.codes },
    { el: $departaments, api: parent.departaments },
]

for (const section of sections) {
    const el = section.el
    const ctrl = new TableController(
        new TableView(el.querySelector("table")),
        section.api,
        parent.appAlert,
        el.querySelector(".btn-error"),
        new TableModel()
    ).init()

    ctrl.getData()
}
