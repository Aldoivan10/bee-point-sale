class CartControlller {
    constructor(view, model, $modal) {
        this.view = view
        this.model = model
        this.$modal = $modal
        this.$select = $modal.querySelector("select")
        this.fillClients(this.$select)
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
                this.model.amount(),
                parent.userCtrl.getUser(),
                this.$select.value
            )
        }
        this.$modal.showModal()
    }
}
