function removeChilds(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function confirmDialog(title, text, onAccept, onCancel = () => {}) {
    modalConfirm.querySelector("h3").textContent = title
    modalConfirm.querySelector("p").textContent = text
    modalConfirm.querySelector(".btn-success").onclick = onAccept
    modalConfirm.querySelector(".btn-error").onclick = onCancel
    modalConfirm.showModal()
}

function setVal(key, val) {
    localStorage.setItem(key, val)
}

function getVal(key) {
    return localStorage.getItem(key)
}

function delVal(key) {
    localStorage.removeItem(key)
}

function input(options) {
    const $lbl = document.createElement("label")
    const $input = document.createElement("input")
    $lbl.className =
        "input input-bordered flex items-center gap-2 input-primary fill-current has-[input:focus]:fill-primary [&>svg]:min-w-4 [&>svg]:min-h-4 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:opacity-70 [&>svg]:transition-colors"
    $input.type = options.type ? options.type : "text"
    $input.placeholder = options.placeholder ? options.placeholder : ""
    $input.className = "grow w-[100%]"

    if (options.id) $input.id = options.id
    if (options.name) $input.name = options.name
    if (options.value) $input.value = options.value
    if (options.min) $input.min = options.min
    if (options.max) $input.max = options.max
    if (options.step) $input.min = options.step
    if (options.maxLength) $input.maxLength = options.maxLength
    if (options.icon) $lbl.appendChild(svg(options.icon))
    if (options.disabled) $input.disabled = true
    if (options.type && options.type === "number")
        $input.onblur = () => ($input.value = parseInt($input.value).toFixed(2))

    $lbl.appendChild($input)
    if (options.badge) {
        const $badge = document.createElement("span")
        $badge.className = "badge badge-info"
        $badge.textContent = options.badge
        $lbl.appendChild($badge)
    }
    return $lbl
}

function svg(path) {
    const uri = "http://www.w3.org/2000/svg"
    const $svg = document.createElementNS(uri, "svg")
    const $path = document.createElementNS(uri, "path")
    $path.setAttribute("d", path)
    $svg.appendChild($path)
    $svg.setAttribute("viewBox", "0 0 512 512")
    $svg.setAttribute("xmlns", uri)
    $svg.setAttribute("fill", "currentColor")
    $svg.setAttribute("stroke", "currentColor")
    return $svg
}

function select(id, placeholder, options, name) {
    const $select = document.createElement("select")
    const $placeholder = document.createElement("option")
    if (id) $select.id = id
    if (name) $select.name = name
    $select.className = "select select-primary w-full"
    $placeholder.textContent = placeholder
    $placeholder.disabled = true
    $placeholder.selected = true
    $select.appendChild($placeholder)
    for (const opt of options) {
        const $opt = document.createElement("option")
        $opt.textContent = opt.text
        $opt.value = opt.value
        $select.appendChild($opt)
    }
    return $select
}

function button(options) {
    const $btn = document.createElement("button")
    $btn.className = `btn grid place-items-center [&_svg]:h-4 [&_svg]:w-4 ${
        options.class ? options.class : ""
    }`
    $btn.type = options.type ? options.type : "button"
    if (options.icon) $btn.appendChild(svg(options.icon))
    if (options.text) $btn.textContent = options.text
    return options.tip ? tooltip($btn, options.tip) : $btn
}

function tooltip(el, tip) {
    const $tooltip = document.createElement("div")
    $tooltip.className = `tooltip ${tip.class ? tip.class : ""}`
    $tooltip.dataset.tip = tip.text
    $tooltip.appendChild(el)
    return $tooltip
}

function tab(text) {
    const $tab = document.createElement("li")
    const $spanClose = document.createElement("span")
    const $text = document.createElement("span")
    const $close = button({
        class: "btn-ghost font-bold btn-tab-close btn-xs btn-circle [&_span]:translate-y-[-2px] z-10",
    })
    $tab.role = "tab"
    $tab.className = "tab min-w-[120px] flex gap-2 pe-2 ps-3"
    $text.className = "grow"
    $text.textContent = text
    $spanClose.textContent = "x"
    $tab.appendChild($text)
    $close.appendChild($spanClose)
    $tab.appendChild($close)
    $text.onclick = (evt) => {
        evt.preventDefault()
        evt.stopPropagation()
        $tab.click()
    }
    $close.addEventListener("click", (evt) => {
        evt.preventDefault()
        evt.stopPropagation()
    })
    return $tab
}

function object(path, id, type = "text/html") {
    const $object = document.createElement("object")
    $object.data = path
    $object.type = type
    if (id) $object.id = id
    return $object
}
