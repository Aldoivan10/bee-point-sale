const parent = window.parent

const sections = [
    {
        el: $users,
        api: parent.users,
        titleDialog: "Crear usuario",
        name: "users",
    },
    {
        el: $codes,
        api: parent.codes,
        titleDialog: "Crear código",
        name: "codes",
    },
    {
        el: $departaments,
        api: parent.departaments,
        titleDialog: "Crear departamento",
        name: "departaments",
    },
    {
        el: $units,
        api: parent.units,
        titleDialog: "Crear unidad",
        name: "units",
    },
]

const controllers = {}

for (const section of sections) {
    const el = section.el
    const $btn = el.querySelector(".btn-success")
    const ctrl = new TableController(
        new TableView(el.querySelector("table")),
        section.api,
        parent.appAlert,
        el.querySelector(".btn-error"),
        new TableModel()
    ).init()
    controllers[section.name] = ctrl
    $btn.onclick = () =>
        window.parent.createDialog(section.titleDialog, async (txt) => {
            const response = await section.api.create(txt)
            ctrl.showAlert(response)
        })
    ctrl.getData()
}

parent.api.onCatalogUpdated((catalog) => controllers[catalog].update())
