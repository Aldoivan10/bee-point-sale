const parent = window.parent
const dialog = window.parent.createDialog
const appAlert = parent.appAlert
const sections = [
    {
        el: $users,
        api: parent.users,
        title: "usuario",
        name: "users",
    },
    {
        el: $codes,
        api: parent.codes,
        title: "código",
        name: "codes",
    },
    {
        el: $departaments,
        api: parent.departaments,
        title: "departamento",
        name: "departaments",
    },
    {
        el: $units,
        api: parent.units,
        title: "unidad",
        name: "units",
    },
    {
        el: $roles,
        api: parent.roles,
        title: "rol",
        name: "roles",
    },
]

const controllers = {}
const createAlert = new Alert(window.parent.$create)

for (const section of sections) {
    const el = section.el
    const title = section.title
    const $btn = el.querySelector(".btn-success")
    const ctrl = new TableController(
        new TableView(el.querySelector("table")),
        section.api,
        createAlert,
        el.querySelector(".btn-error"),
        new TableModel(),
        appAlert
    ).init()
    controllers[section.name] = ctrl

    if (title === "usuario") {
    } else {
        $btn.onclick = () =>
            dialog({
                title: `Crear ${title}`,
                onAccept: async (txt) => {
                    if (txt) {
                        const response = await section.api.create(txt)
                        ctrl.showAlert(response)
                    } else
                        ctrl.showAlert({
                            status: "error",
                            msg: "Complete el campo",
                        })
                },
            })
        ctrl.onEdit(($rows) => {
            const $row = $rows[0]
            dialog({
                title: `Editar ${title}`,
                edit: true,
                value: $row.querySelector("td:nth-child(3)").textContent,
                onAccept: async (txt) => {
                    if (txt) {
                        const response = await section.api.edit({
                            id: +$row.querySelector("td:nth-child(2)")
                                .textContent,
                            name: txt,
                        })
                        ctrl.showAlert(response)
                    } else
                        ctrl.showAlert({
                            status: "error",
                            msg: "Complete el campo",
                        })
                },
            })
        })
    }
    ctrl.getData()
}

parent.api.onCatalogUpdated((catalog) => controllers[catalog].update())
