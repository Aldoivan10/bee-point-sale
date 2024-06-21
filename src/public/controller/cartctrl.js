class CartControlller {
    constructor(view, api, $modal, model) {
        this.view = view
        this.api = api
        this.$modal = $modal
        this.$select = $modal.querySelector("select")
        this.fillClients(this.$select)
        view.addListener(() => {
            this.api.items = []
            model.setData([])
        })
    }

    async fillClients(select) {
        const clients = await parent.clients.clients()
        for (const client of clients) {
            const opt = document.createElement("option")
            opt.value = client.Nombre
            opt.textContent = client.Nombre
            opt.selected = client.Nombre === "Venta de Mostrador"
            select.appendChild(opt)
        }
    }

    show() {
        this.$modal.querySelector(".btn-success").onclick = () => {
            this.$modal.close()
            this.view.show(
                this.api.amount(),
                parent.userCtrl.getUser(),
                this.$select.value,
                this.api.items
            )
        }
        this.$modal.showModal()
    }
}
