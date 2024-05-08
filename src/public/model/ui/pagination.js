class Pagination {
    constructor($pagination, $pageSize, maxSteps = 9) {
        this.$pagination = $pagination
        this.pageSize = +$pageSize.value
        this.maxSteps = maxSteps
        this.offsetSize = 0
        this.listeners = []
        this.steps = 0
        this.page = 1

        $pageSize.onchange = this.updatePageSize
        this.removeChilds = window.parent.removeChilds
    }

    buildPagination(total) {
        this.removeChilds(this.$pagination)
        this.steps = Math.ceil(total / this.pageSize)
        const numButtons =
            this.steps < this.maxSteps ? this.steps : this.maxSteps
        for (let step = 1; step <= numButtons; step++) {
            const input = document.createElement("input")
            input.type = "radio"
            input.name = "pagination"
            input.className = "join-item btn btn-square"
            if (step == this.maxSteps - 1 && this.steps > this.maxSteps) {
                input.ariaLabel = "..."
                input.classList.add("btn-disabled")
            } else input.ariaLabel = step
            input.onclick = () => this.updatePage(+input.ariaLabel)
            this.$pagination.appendChild(input)
        }

        this.total = total
        this.reset()
    }

    updatePagination(current, steps, maxSteps) {
        if (this.steps <= this.maxSteps) return
        const buttons = Array.from(this.$pagination.childNodes)
        if (current < maxSteps - 2) {
            for (let i = 1; i <= maxSteps; i++) {
                const btn = buttons[i - 1]
                if (i === maxSteps - 1) {
                    btn.ariaLabel = "..."
                    btn.classList.add("btn-disabled")
                } else {
                    btn.ariaLabel = i === maxSteps ? steps : i
                    btn.classList.remove("btn-disabled")
                }
            }
        } else if (current > steps - maxSteps + 3) {
            let btnIndex = -1
            for (let i = steps - maxSteps + 1; i <= steps; i++) {
                const btn = buttons[++btnIndex]
                if (btnIndex === 1) {
                    btn.ariaLabel = "..."
                    btn.classList.add("btn-disabled")
                } else {
                    btn.ariaLabel = btnIndex === 0 ? 1 : i
                    btn.classList.remove("btn-disabled")
                }
            }
        } else {
            let init = current - 3
            for (let i = 0; i < maxSteps; i++) {
                const btn = buttons[i]
                if (i === 1 || i === maxSteps - 2) {
                    btn.ariaLabel = "..."
                    btn.classList.add("btn-disabled")
                } else {
                    btn.ariaLabel =
                        i === 0 ? 1 : i === maxSteps - 1 ? steps : ++init
                    btn.classList.remove("btn-disabled")
                }
            }
        }

        buttons.find((btn) => +btn.ariaLabel === current).click()
    }

    updatePage(newPage) {
        if (newPage === this.page) return
        this.$pagination.setAttribute("page", newPage)
        this.offsetSize = (newPage - 1) * this.pageSize
        this.page = newPage
        this.updatePagination(newPage, this.steps, this.maxSteps)
        this.notify()
    }

    updatePageSize = (evt) => {
        const newSize = +evt.target.value
        if (newSize === this.pageSize) return
        this.pageSize = newSize
        this.buildPagination(this.total)
        this.notify()
    }

    reset() {
        this.page = 1
        this.offsetSize = 0
        this.$pagination.setAttribute("page", 1)
        this.$pagination.firstChild.checked = true
        this.$pagination.lastChild.ariaLabel = this.steps
    }

    offset() {
        return this.offsetSize
    }

    size() {
        return this.pageSize
    }

    addListener(action) {
        this.listeners.push(action)
    }

    notify() {
        for (const action of this.listeners) action(this.size(), this.offset())
    }
}
