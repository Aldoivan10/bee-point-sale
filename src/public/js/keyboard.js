document.addEventListener("keydown", (evt) => {
    const keys = []
    evt.preventDefault()
    if (evt.key !== "AltGraph" && evt.ctrlKey) {
        const kbds = Array.from(
            $keyboard.querySelectorAll("kbd[data-key=ctrl]")
        )
        keys.push(...kbds)
    }
    if (evt.altKey) {
        const kbds = Array.from($keyboard.querySelectorAll("kbd[data-key=alt]"))
        keys.push(...kbds)
    }
    const kbds = Array.from(
        $keyboard.querySelectorAll("kbd:not(.bg-key-inactive)")
    )
    const key = kbds.find((el) => {
        const char = evt.key.toLocaleUpperCase()
        if (el.querySelectorAll("span").length === 0)
            return el.textContent.trim() === char
        else return el.textContent.includes(char)
    })
    if (key) keys.push(key)
    keys.forEach((el) => el.classList.add("bg-key-pressed"))
})

document.addEventListener("keyup", () => {
    const keys = Array.from($keyboard.querySelectorAll(".bg-key-pressed"))
    keys.forEach((el) => el.classList.remove("bg-key-pressed"))
})
