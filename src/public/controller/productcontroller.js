class ProductController {
    constructor(view, model, btnAddItem, modal) {
        this.$view = view
        this.$model = model

        btnAddItem.onclick = () => {
            this._getCodes()
            modal.showModal()
        }
    }

    async _getCodes() {
        const codes = await window.codes.get()
        this.$view.setCodes(codes)
    }
}
