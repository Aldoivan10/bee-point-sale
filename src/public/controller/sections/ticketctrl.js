const appAlert = window.parent.parent.appAlert

async function update() {
    const ticket = {
        pie_pagina: $ticketFooter.value,
        cabecera: $ticketHeader.value,
    }
    const response = await window.parent.api.updateTicket(ticket)
    if (response.status === "error") {
        appAlert.error(response.msg)
        console.log(response.data)
    } else {
        setData()
        appAlert.success(response.msg)
    }
}

async function setData() {
    const ticket = await window.parent.api.ticket()
    if (ticket.cabecera) {
        $header.innerHTML = mapTicketText(ticket.cabecera)
        $ticketHeader.value = ticket.cabecera
    }
    if (ticket.pie_pagina) {
        $footer.innerHTML = mapTicketText(ticket.pie_pagina)
        $ticketFooter.value = ticket.pie_pagina
    }
}

window.onload = () => {
    setData()
    $cancel.onclick = () => setData()
}
