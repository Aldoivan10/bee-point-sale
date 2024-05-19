class ProductModel extends Listener {
    constructor() {
        super("codes", "units")
        this.name = ""
        this.codes = []
        this.units = []

        this.codesListeners = []
        this.unitsListeners = []
    }

    setCodes(codes) {
        this.codes = codes
        this.notify("codes", codes)
    }

    setUnits(units) {
        this.units = units
        this.notify("units", units)
    }

    reset() {
        this.name = ""
        this.codes = []
        this.units = []
    }
}
