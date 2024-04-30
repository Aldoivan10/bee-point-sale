const removeChilds = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

const input = (id, placeholder, icon, type = "text") => {
    const $lbl = document.createElement("label")
    const $input = document.createElement("input")
    $lbl.className =
        "input input-bordered flex items-center gap-2 input-primary fill-current has-[input:focus]:fill-primary [&>svg]:w-4 [&>svg]:h-4 [&>svg]:opacity-70 [&>svg]:transition-colors"
    $input.type = type
    $input.placeholder = placeholder
    $input.className = "grow"
    if (id) $input.id = id
    if (icon) $lbl.appendChild(svg(icon))
    $lbl.appendChild($input)
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
