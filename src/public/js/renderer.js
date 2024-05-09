window.appAlert = new Alert(document.body)

$header.onload = (evt) => {
    const $header = evt.target.contentDocument
    const $tabs = $header.getElementById("$tabs")
    const $btnPrevTab = $header.getElementById("$btnPrevTab")
    const $btnNextTab = $header.getElementById("$btnNextTab")

    const tabCtrl = new TabController(
        $tabs,
        $tabsContent,
        $btnPrevTab,
        $btnNextTab
    ).init()

    window.api.onAddTab(() => tabCtrl.appendTab())
    window.api.onDelTab(() => tabCtrl.deleteTab())
}

const productView = new ProductView($product)
const productModel = new ProductModel()
const productController = new ProductController(
    productView,
    productModel,
    $product
)

window.addProductListener = productController.addProductListener
