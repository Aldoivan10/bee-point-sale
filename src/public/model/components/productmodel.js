class ProductModel {
    constructor() {
        this.name = ""
        this.codes = []
        this.units = []

        this.codesListeners = []
        this.unitsListeners = []
    }

    addCodesListeners(listener) {
        this.codesListeners.push(listener)
    }

    addUnitsListeners(listener) {
        this.unitsListeners.push(listener)
    }

    notifyCodes() {
        this.codesListeners.forEach((listener) => listener(this.codes))
    }

    notifyUnits() {
        this.unitsListeners.forEach((listener) => listener(this.units))
    }

    setCodes(codes) {
        this.codes = codes
        this.notifyCodes()
    }

    setUnits(units) {
        this.units = units
        this.notifyUnits()
    }

    reset() {
        this.name = ""
        this.codes = []
        this.units = []
    }
}
