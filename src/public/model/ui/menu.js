class Menu {
    constructor($menu) {
        this.$buttons = Array.from($menu.children)
        this.listeners = []
        this.$buttons.forEach((btn) => (btn.onclick = this.onOptionClick))
    }

    onOptionClick = (evt) => {
        const $opt = evt.target
        this.$buttons.forEach((div) => div.classList.remove("active"))
        $opt.classList.add("active")
        this.notify($opt.dataset.tip)
    }

    addListenerOpt(listener) {
        this.listeners.push(listener)
    }

    notify(opt) {
        this.listeners.forEach((listener) => listener(opt))
    }
}
