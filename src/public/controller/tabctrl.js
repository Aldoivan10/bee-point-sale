class TabController {
    constructor($tabs, $container, $btnPrevTab, $btnNextTab) {
        this.$tabs = $tabs
        this.$container = $container
        $btnPrevTab.onclick = () => (this.$tabs.scrollLeft -= 120)
        $btnNextTab.onclick = () => (this.$tabs.scrollLeft += 120)
    }

    init() {
        this.appendTab()
        return this
    }

    appendTab() {
        const num = this.getNum()
        const content = `tabContent${num}`
        const tabName = `Tab ${num}`
        const $tab = this.addTab(tabName, content)
        this.checkOverflow()
        this.addContent(content)
        $tab.querySelector("button").onclick = () => this.deleteTab($tab)
        this.$tabs.scrollLeft += 120
        $tab.click()
    }

    deleteTab(tab) {
        const $tab = tab
            ? tab
            : this.$tabs.querySelector(".tab-active:not(:nth-child(1))")
        if ($tab) {
            if (Array.from($tab.classList).includes("tab-active")) {
                const childs = this.$tabs.children
                const silbingIndex = Array.from(childs).findIndex(
                    (el) => el.dataset.content == $tab.dataset.content
                )
                const $silbing = childs[silbingIndex - 1]
                this.getContent($silbing).classList.remove("hidden")
                $silbing.classList.add("tab-active")
                this.$tabs.scrollLeft = $silbing.offsetLeft
            }
            this.getContent($tab).remove()
            $tab.remove()
        }
    }

    clear() {
        const $tabs = this.$tabs.querySelectorAll(".tab")
        $tabs.forEach((tab) => {
            this.getContent(tab).remove()
            tab.remove()
        })
    }

    addTab(tabName, content) {
        const $tab = tab(tabName)
        this.$tabs.appendChild($tab)
        $tab.onclick = this.onClick
        $tab.dataset.content = content
        return $tab
    }

    addContent(content) {
        const $object = object("html/main.html", content)
        const userType = getVal("type")
        $object.className = "grow"
        $object.addEventListener("load", () => {
            if (userType) $object.contentDocument.body.classList.add(userType)
        })
        this.$container.appendChild($object)
    }

    getNum() {
        const childs = this.$tabs.children
        let num = 0
        if (childs.length === 0) num = 1
        else
            num = ++childs[childs.length - 1]
                .querySelector("span")
                .textContent.split(" ")[1]
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
