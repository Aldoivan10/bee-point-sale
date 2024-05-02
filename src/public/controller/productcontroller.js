class ProductController {
    constructor(view, model, btnAddItem, btnAddUnit, btnDelUnit, modal) {
        this.$view = view
        this.$model = model

        btnAddItem.onclick = () => {
            this._getCodes()
            modal.showModal()
        }
        btnDelUnit.onclick = () => view.removeProductUnit()
        modal.onclose = () => view.clear()
        btnAddUnit.onclick = this._addUnit
    }

    async _getCodes() {
        const codes = await window.codes.get()
        this.$view.setCodes(codes)
    }

    _addUnit = async () => {
        const units = await window.units.get()
        const { buy, profit, descount, sell } = this.$view.addProductUnit(units)

        const updatePrice = () =>
            this.setPrice(sell, +buy.value, +profit.value, +descount.value)

        buy.oninput = updatePrice
        profit.oninput = updatePrice
        descount.oninput = updatePrice
    }

    setPrice($price, buyPrice, profit, descount) {
        const price =
            buyPrice + (buyPrice * profit) / 100 - (buyPrice * descount) / 100
        const fixedPrice = +price.toFixed(2)
        const round = Math.round(fixedPrice)
        $price.value = (
            fixedPrice >= round ? Math.ceil(fixedPrice * 2) / 2 : round
        ).toFixed(2)
    }
}
