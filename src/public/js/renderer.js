window.appAlert = new Alert(document.body)

$header.onload = (evt) => {
    const $header = evt.target.contentDocument

    const drawer = new Drawer($drawer, $drawerContent, $drawerMenu).init(
        $header
    )
}
