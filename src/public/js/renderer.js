window.appAlert = new Alert(document.body)

let productController = null

$header.onload = async (evt) => {
    const $header = evt.target.contentDocument

    const drawer = await new Drawer($drawer, $drawerContent, $drawerMenu).init(
        $header
    )
    productController = drawer.productController
}
