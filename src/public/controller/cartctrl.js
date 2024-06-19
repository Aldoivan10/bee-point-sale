class CartControlller {
    constructor(view, model, $modal) {
        this.view = view
        this.model = model
        this.$modal = $modal
    }

    show() {
        this.$modal.querySelector("h3").textContent = "¿Continuar con la venta?"
        this.$modal.querySelector("p").textContent = "Se procederá con el pago"
        this.$modal.querySelector(".btn-success").onclick = () => {
            this.$modal.close()
            this.view.show(this.model.amount())
        }
        this.$modal.showModal()
    }
}
