window.appAlert = new Alert(document.body)

$header.onload = async (evt) => {
    const $header = evt.target.contentDocument

    const drawer = await new Drawer($drawer, $drawerContent, $drawerMenu).init(
        $header
    )
    window.productController = drawer.productController
    window.clientController = null
    window.cartController = null
}
