class CartView {
    constructor($modal) {
        this.$modal = $modal
        this.$amount = $modal.querySelector("input")
        this.$buy = $modal.querySelector("#buy")
        this.$exchange = $modal.querySelector("#exchange")
        this.$buy.oninput = () => {
            const exchange = +this.$buy.value - +this.$amount.value
            this.$exchange.value = exchange
        }
    }

    show(total) {
        this.$amount.value = total
        this.$modal.showModal()
    }
}
