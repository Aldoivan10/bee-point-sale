async function setData() {
    const ticket = await window.parent.api.ticket()
    if (ticket.cabecera) $header.innerHTML = mapTicketText(ticket.cabecera)
    if (ticket.pie_pagina) $footer.innerHTML = mapTicketText(ticket.pie_pagina)
    initPrint()
}

function initPrint() {
    const prtContent = document.querySelector("section")
    const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
    )
    /* WinPrint.document.write(prtContent.innerHTML)
    WinPrint.document.close()
    WinPrint.focus()
    WinPrint.print()
    WinPrint.close() */
}

window.onload = () => {
    setData()
}
