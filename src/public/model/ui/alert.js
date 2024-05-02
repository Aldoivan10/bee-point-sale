class Alert {
    constructor(container) {
        this.toast = document.createElement("div")
        this.toast.className = "toast toast-bottom toast-end z-20"
        container.appendChild(this.toast)
    }

    success(msg, timer = 0) {
        this.showAlert(msg, "alert-success", timer)
    }

    error(msg, timer = 0) {
        this.showAlert(msg, "alert-error", timer)
    }

    warning(msg, timer = 0) {
        this.showAlert(msg, "alert-warning", timer)
    }

    info(msg, timer = 0) {
        this.showAlert(msg, "alert-info", timer)
    }

    showAlert(text, type, timer) {
        const alert = document.createElement("div")
        const span = document.createElement("span")
        alert.classList.add("alert", "flex", "justify-between", type)
        span.textContent = text
        alert.appendChild(span)
        if (timer > 0) setTimeout(() => alert.remove(), timer)
        else {
            const btn = document.createElement("button")
            const svg = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
            )
            const path = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            )

            path.setAttribute(
                "d",
                "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            )

            svg.classList.add("w-4", "h-4")
            svg.setAttribute("viewBox", "0 0 384 512")
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")

            btn.classList.add(
                "btn",
                "btn-circle",
                "btn-outline",
                "btn-sm",
                "fill-primary-content",
                "border-primary-content",
                "hover:bg-primary-content",
                "hover:border-primary-content",
                "hover:fill-white"
            )
            svg.appendChild(path)
            btn.appendChild(svg)
            alert.appendChild(btn)
            btn.onclick = () => alert.remove()
        }
        this.toast.appendChild(alert)
    }
}
