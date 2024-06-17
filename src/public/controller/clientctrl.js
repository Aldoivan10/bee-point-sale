class ClientController extends Listener {
    constructor(view, model, $modal) {
        super()
        this.view = view
        this.model = model
        this.alert = new Alert($modal)
        this.$modal = $modal

        const observer = new DialogObserver($modal)
        observer.onClose(this.view.clear)
    }

    showModal() {}

    save = async () => {}
}
