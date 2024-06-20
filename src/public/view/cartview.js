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

    showAlert(response) {
        if (response.status === "success") parent.appAlert.success(response.msg)
        else {
            parent.appAlert.error(response.msg)
            console.log(response.data)
        }
        this.$buy.value = 0
        this.$exchange.value = 0
    }

    show(total, user, entity, items) {
        const data = { user: user, entity: entity, items: items }
        this.$amount.value = total
        this.$modal.showModal()
        this.$modal.querySelector(".btn-warning").onclick = async () => {
            const response = await parent.api.saveLog(data)
            this.showAlert(response)
            this.$modal.close()
        }
        this.$modal.querySelector(".btn-success").onclick = async () => {
            const response = await parent.api.saveLog(data)
            this.showAlert(response)
            this.$modal.close()
        }
    }
}
