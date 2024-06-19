class Drawer {
    constructor($drawer, $drawerContent, $drawerMenu) {
        this.$drawer = $drawer
        this.$drawerMenu = $drawerMenu
        this.$drawerContent = $drawerContent
        this.options = {
            "point-sale-view": {
                path: "M36.8 192H603.2c20.3 0 36.8-16.5 36.8-36.8c0-7.3-2.2-14.4-6.2-20.4L558.2 21.4C549.3 8 534.4 0 518.3 0H121.7c-16 0-31 8-39.9 21.4L6.2 134.7c-4 6.1-6.2 13.2-6.2 20.4C0 175.5 16.5 192 36.8 192zM64 224V384v80c0 26.5 21.5 48 48 48H336c26.5 0 48-21.5 48-48V384 224H320V384H128V224H64zm448 0V480c0 17.7 14.3 32 32 32s32-14.3 32-32V224H512z",
                text: "Punto de venta",
                view: "",
            },
            "stadistics-view": {
                path: "M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z",
                text: "Estadísticas",
                view: "stadistics.html",
            },
            "catalogs-view": {
                path: "M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z",
                text: "Catálogos",
                view: "catalogs.html",
            },
            "keys-view": {
                path: "M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm16 64h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm80-176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V144zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zM160 336c0-8.8 7.2-16 16-16H400c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V336zM272 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM256 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM368 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM352 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V240zM464 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM448 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V240zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16z",
                text: "Atajos",
                view: "keymap.html",
            },
            "ticket-view": {
                path: "M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z",
                text: "Ticket",
                view: "printer.html",
            },
        }
    }

    async init($header) {
        const keyMap = await api.getkeyMap()
        const focusOptionEvent = (evt) => {
            this.$drawerMenu.querySelectorAll("button").forEach((el) => {
                el.classList.remove("tab-active")
            })
            evt.target.classList.add("tab-active")
        }
        for (const key of Object.keys(this.options)) {
            const opt = this.getOption(
                this.options[key].text,
                Object.entries(keyMap).find(([_, val]) => val.func === key)[0],
                this.options[key].path,
                focusOptionEvent,
                (evt) => {
                    if (!evt.target.classList.contains("tab-active"))
                        this.onViewChange(this.options[key].view)
                }
            )
            this.$drawerMenu.appendChild(opt)
        }

        this.productController = this.initProductView($header)
        this.$drawerMenu.querySelector("button").click()

        return this
    }

    initProductView($header) {
        const $tabs = $header.getElementById("$tabs")
        const $btnPrevTab = $header.getElementById("$btnPrevTab")
        const $btnNextTab = $header.getElementById("$btnNextTab")

        const productView = new ProductView($product)
        const productModel = new ProductModel()
        const productController = new ProductController(
            productView,
            productModel,
            $product
        )

        this.tabCtrl = new TabController(
            $tabs,
            $drawerContent,
            $btnPrevTab,
            $btnNextTab
        )

        window.api.onAddTab(() => this.tabCtrl.appendTab())
        window.api.onDelTab(() => this.tabCtrl.deleteTab())

        window.addProductListener = productController.addListener

        return productController
    }

    getOption(text, keyCombination, path, focusEvent, action) {
        const $li = document.createElement("li")
        const $btn = document.createElement("button")
        const $svg = svg(path)

        $li.role = "tab"
        $li.className = "tab"
        $btn.type = "button"
        $btn.className = "btn btn-sm flex gap-4"

        $btn.appendChild($svg)
        $btn.innerHTML += `${text} (${keyCombination})`
        $btn.addEventListener("click", action)
        $btn.addEventListener("click", focusEvent)

        $li.appendChild($btn)

        return $li
    }

    onViewChange = (view) => {
        if (view) {
            this.tabCtrl.clear()
            removeChilds(this.$drawerContent)
            const $obj = object(`html/${view}`)

            this.$drawerContent.appendChild($obj)
        } else {
            removeChilds(this.$drawerContent)
            this.tabCtrl.init()
        }
    }
}
