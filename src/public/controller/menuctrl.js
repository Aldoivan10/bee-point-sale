const buttons = document.querySelectorAll("footer div")

buttons.forEach((btn) => {
    btn.onclick = () => {
        buttons.forEach((div) => div.classList.remove("active"))
        btn.classList.add("active")
    }
})
