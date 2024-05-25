const parent = window.parent
const tblUserCtrl = new TableController(
    new TableView($tblUsuarios),
    parent.users,
    parent.appAlert,
    document.createElement("button"),
    new TableModel()
).init()

tblUserCtrl.getData()
