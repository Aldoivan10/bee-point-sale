/* 
const getHeaders = async () => {
    const codes = await window.codes.get()
    const headers = codes
        .map((code) => code["nombre"])
        .concat(["Nombre", "Unidad", "Cantidad", "Precio"])
    putHeaders(headers)
}
*/

class TableController {
    constructor(view, model) {
        this.$view = view
        this.$model = model
    }
}
