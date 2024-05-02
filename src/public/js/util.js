const removeChilds = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

const input = (options) => {
    const $lbl = document.createElement("label")
    const $input = document.createElement("input")
    $lbl.className =
        "input input-bordered flex items-center gap-2 input-primary fill-current has-[input:focus]:fill-primary [&>svg]:min-w-4 [&>svg]:min-h-4 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:opacity-70 [&>svg]:transition-colors"
    $input.type = options.type ? options.type : "text"
    $input.placeholder = options.placeholder ? options.placeholder : ""
    $input.className = "grow w-[100%]"

    if (options.id) $input.id = options.id
    if (options.value) $input.value = options.value
    if (options.min) $input.min = options.min
    if (options.max) $input.max = options.max
    if (options.step) $input.min = options.step
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

const svg = (path) => {
    const uri = "http://www.w3.org/2000/svg"
    const $svg = document.createElementNS(uri, "svg")
    const $path = document.createElementNS(uri, "path")
    $path.setAttribute("d", path)
    $svg.appendChild($path)
    $svg.setAttribute("viewBox", "0 0 512 512")
    $svg.setAttribute("xmlns", uri)
    return $svg
}

const select = (id, placeholder, options) => {
    const $select = document.createElement("select")
    const $placeholder = document.createElement("option")
    if (id) $select.id = id
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
