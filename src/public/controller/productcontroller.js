class ProductController extends Listener {
    constructor(view, model, $modal) {
        super()
        this.view = view
        this.model = model
        this.listeners = []
        this.alert = new Alert($modal)

        const observer = new DialogObserver($modal)
        observer.onShow(this.getCodes)
        observer.onClose(this.view.clear)
    }

    getCodes = async () => {
        const codes = await window.codes.get()
        this.view.setCodes(codes)
    }

    addUnit = async () => {
        const units = await window.units.get()
        const { buy, profit, descount, sell, close, $container } =
            this.view.addProductUnit(units)

        const updatePrice = () =>
            this.setPrice(sell, +buy.value, +profit.value, +descount.value)

        buy.oninput = updatePrice
        profit.oninput = updatePrice
        descount.oninput = updatePrice
        close.onclick = () => $container.remove()
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

    saveProduct = async (evt) => {
        evt.preventDefault()
        const { name, codes, units } = this.view.getElements()
        if (!name.value) this.alert.error("El producto debe llevar un nombre")
        else {
            const mappedCodes = codes.reduce((acc, el) => {
                if (!el.value) return acc
                return { ...acc, [el.id]: el.value }
            }, {})
            if (Object.keys(mappedCodes).length == 0)
                this.alert.error(
                    "Debe haber al menos un código de identificación"
                )
            else {
                const isCompleteUnits = units.every((inputs) =>
                    inputs.every((el) => {
                        if (el.tagName === "SELECT") return !isNaN(el.value)
                        return !!el.value
                    })
                )
                if (!isCompleteUnits)
                    this.alert.warning("Complete los campos faltantes")
                else {
                    const mappedUnits = units.reduce((acc, inputs) => {
                        const unitObj = inputs.reduce((obj, el) => {
                            return { ...obj, [el.name]: el.value }
                        }, {})
                        acc.push(unitObj)
                        return acc
                    }, [])

                    const res = await window.products.create({
                        name: name.value,
                        units: mappedUnits,
                        codes: mappedCodes,
                    })
                    if (res.status === "success") {
                        this.alert.success(res.msg)
                        this.view.clear()
                        this.getCodes()
                        this.notify("main", "productos")
                    } else {
                        console.log(res)
                        this.alert.error(res.msg)
                    }
                }
            }
        }
    }
}
