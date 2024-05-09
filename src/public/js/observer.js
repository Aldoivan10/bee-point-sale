class DialogObserver {
    constructor($dialog) {
        this.onShowEvent = () => {}
        this.onCloseEvent = () => {}

        const observer = new MutationObserver((evt) => {
            if (evt[0].target.hasAttribute("open")) this.onShowEvent()
            else this.onCloseEvent()
        })
        observer.observe($dialog, { attributes: true })
    }

    onShow(func) {
        this.onShowEvent = func
    }

    onClose(func) {
        this.onCloseEvent = func
    }
}
