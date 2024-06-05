const appAlert = window.parent.parent.appAlert

function mapText(str) {
    if (str) {
        const replacements = {
            SC: {
                result: '<strong class="center">$1</strong>',
                regex: /-\*(.+)\*-/gi,
            },
            CS: {
                result: '<strong class="center">$1</strong>',
                regex: /\*-(.+)-\*/gi,
            },
            C: {
                result: '<p class="center">$1</p>',
                regex: /-(.+)-/gi,
            },
            S: {
                result: "<strong>$1</strong>",
                regex: /\*(.+)\*/gi,
            },
        }
        let mappedText = str

        for (const key of Object.keys(replacements)) {
            const regex = replacements[key].regex
            const result = replacements[key].result
            mappedText = mappedText.replace(regex, result)
        }

        mappedText = mappedText
            .split("\n")
            .map((str) => {
                if (str.includes("</p>") || str.includes("</strong>"))
                    return str
                return `<p>${str}</p>`
            })
            .join("")

        return mappedText
    }
    return ""
}

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
        $header.innerHTML = mapText(ticket.cabecera)
        $ticketHeader.value = ticket.cabecera
    }
    if (ticket.pie_pagina) {
        $footer.innerHTML = mapText(ticket.pie_pagina)
        $ticketFooter.value = ticket.pie_pagina
    }
}

window.onload = () => {
    setData()
    $cancel.onclick = () => setData()
}
