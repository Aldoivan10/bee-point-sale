const parent = window.parent
const sections = [
    { el: $users, api: parent.users, titleDialog: "Crear usuario" },
    { el: $codes, api: parent.codes, titleDialog: "Crear código" },
    {
        el: $departaments,
        api: parent.departaments,
        titleDialog: "Crear departamento",
    },
    { el: $units, api: parent.units, titleDialog: "Crear unidad" },
]

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
    $btn.onclick = () =>
        window.parent.createDialog(section.titleDialog, async (txt) => {
            const response = await section.api.create(txt)
            console.log(response)
        })
    ctrl.getData()
}
