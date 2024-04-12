const removeChilds = (element) => {
    while (element.firsChild) {
        element.removeChild(element.firsChild)
    }
}
