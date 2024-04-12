class LiveVar {
    elements = []
    calls = []

    constructor(val) {
        this.val = val
    }

    suscribe(...el) {
        this.elements.push(el)
    }

    onUpdate(action) {
        this.calls.push(action)
    }

    update(newVal) {
        this.val = newVal
        this.notify()
        this.doActions()
    }

    doActions() {
        for (action of this.calls) {
            action(this.val)
        }
    }

    notify() {
        for (const el of this.elements) {
            el.innerText = this.val
        }
    }
}
