class ProductController extends Listener {
    constructor(view, model, $modal) {
        super()
        this.view = view
        this.model = model
        this.alert = new Alert($modal)
        this.$modal = $modal

        const observer = new DialogObserver($modal)
        observer.onClose(this.view.clear)
    }

    async showModal(obj = null, id = null) {
        const codes = await window.codes.get()
        const btn = this.$modal.querySelector(".modal-action .btn:nth-child(2)")
        this.view.setCodes(codes, obj)
        if (obj) {
            const units = obj.unidades
            this.view.setName(obj.Nombre)
            for (const unit of units) this.addUnit(unit)
        }
        if (id) {
            btn.classList.remove("btn-success")
            btn.classList.add("btn-warning")
            btn.textContent = "Editar"
            btn.dataset.id = id
        } else {
            btn.classList.remove("btn-warning")
            btn.classList.add("btn-success")
            btn.textContent = "Guardar"
            btn.removeAttribute("data-id")
        }
        this.$modal.showModal()
    }

    addUnit = async (unit) => {
        const units = await window.units.get()
        const {
            buy,
            profit,
            descount,
            sell,
            close,
            $container,
            $select,
            quantity,
        } = this.view.addProductUnit(units)

        const updatePrice = () =>
            this.setPrice(sell, +buy.value, +profit.value, +descount.value)

        if (unit) {
            $select.value = unit.id_unidad
            quantity.value = unit.Cantidad
            buy.value = unit["Precio de compra"]
            sell.value = unit["Precio de venta"]
            descount.value = unit.Descuento
        }

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

    save = async (evt) => {
        const id = evt.target.dataset.id
        const { name, codes, units } = this.view.getElements()

        if (!name.value) this.alert.error("El producto debe llevar un nombre")
        else {
            if (id) {
                const response = await window.products.delete([[id]])
                if (response.status === "error") {
                    console.log(res.data)
                    this.alert.error("Error al actualizar")
                    return
                }
            }
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
                        if (!id) {
                            this.view.clear()
                            this.view.setCodes(
                                codes.reduce((acc, input) => {
                                    acc.push({
                                        id: +input.id,
                                        Nombre: input.placeholder,
                                    })
                                    return acc
                                }, [])
                            )
                        }
                        this.notify("main", "productos")
                    } else {
                        console.log(res.data)
                        this.alert.error(res.msg)
                    }
                }
            }
        }
    }
}
