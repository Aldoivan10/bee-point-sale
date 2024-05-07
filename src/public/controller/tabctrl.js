class TabController {
    constructor($tabs, $container) {
        this.$tabs = $tabs
        this.$container = $container
    }

    init() {
        this.appendTab()
        return this
    }

    appendTab() {
        const num = this.getNum()
        const $tab = this.addTab(num)
        this.checkOverflow()
        this.addContent(num)
        $tab.click()
    }

    deleteTab(tab) {
        const $tab = tab
            ? tab
            : this.$tabs.querySelector(".tab-active:not(:nth-child(1))")
        if ($tab) {
            const childs = this.$tabs.children
            const silbingIndex = Array.from(childs).findIndex(
                (el) => el.dataset.content == $tab.dataset.content
            )
            const $silbing = childs[silbingIndex - 1]
            this.getContent($tab).remove()
            this.getContent($silbing).classList.remove("hidden")
            $silbing.classList.add("tab-active")
            $tab.remove()
        }
    }

    addTab(num) {
        const $tab = tab(`Tab ${num}`)
        this.$tabs.appendChild($tab)
        $tab.onclick = this.onClick
        $tab.dataset.content = `tabContent${num}`
        return $tab
    }

    addContent(num) {
        const $object = object("html/main.html", `tabContent${num}`)
        $object.className = "grow"
        this.$container.appendChild($object)
    }

    getNum() {
        const childs = this.$tabs.children
        let num = 0
        if (childs.length === 0) num = 1
        else num = ++childs[childs.length - 1].textContent.split(" ")[1]
        return num
    }

    getContent($tab) {
        return this.$container.querySelector(`#${$tab.dataset.content}`)
    }

    checkOverflow() {
        const isOverflow = this.$tabs.scrollWidth > this.$tabs.clientWidth
        if (isOverflow) this.$tabs.classList.add("overflowing")
        else this.$tabs.classList.remove("overflowing")
    }

    onClick = (evt) => {
        const $tab = evt.target
        Array.from(this.$tabs.children).forEach((tab) =>
            tab.classList.remove("tab-active")
        )
        Array.from(this.$container.children).forEach((el) =>
            el.classList.add("hidden")
        )
        $tab.classList.add("tab-active")
        this.$container
            .querySelector(`#${$tab.dataset.content}`)
            .classList.remove("hidden")
    }
}
