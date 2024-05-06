window.addEventListener("load", () => {
    const $tabs = document
        .getElementById("header")
        .contentDocument.querySelector("ul[role=tablist]")

    const onClick = (evt) => {
        const $tab = evt.target
        Array.from($tabs.children).forEach((tab) =>
            tab.classList.remove("tab-active")
        )
        $tab.classList.add("tab-active")
    }

    $tabs.children[0].onclick = onClick

    window.api.onAddTab(() => {
        const $tab = tab(`Tab ${$tabs.children.length + 1}`)
        $tabs.appendChild($tab)
        $tab.onclick = onClick
        const isOverflow = $tabs.scrollWidth > $tabs.clientWidth
        if (isOverflow) $tabs.classList.add("overflowing")
        else $tabs.classList.remove("overflowing")
    })
})
