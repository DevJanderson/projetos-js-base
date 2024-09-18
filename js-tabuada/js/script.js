// Seleções de elementos
const multiplicationform = document.querySelector("#multiplication-form")
const numberInput = document.querySelector("#number")
const multiplicadorInput = document.querySelector("#multiplicador")

const multiplicationTable = document.querySelector("#multiplication-operations")

const multiplicationTitle = document.querySelector("#multiplication-title span")

// Funções
const createTable = (number, multiplicatorNumber) => {
    // console.log(number, multiplicatorNumber)
    multiplicationTable.innerHTML = ""

    for (i = 1; i <= multiplicatorNumber; i++ ) {
        const result = number * i
        // <div class="operation">${number} x ${i}</div> 
        const template = `
            <div class="row">
                <div class="operation">${number} x ${i}</div> 
                =
                <div class="result">${result}</div>
            </div> 
        `
        const parser = new DOMParser()
        const htmlTemplate = parser.parseFromString(template, "text/html")
        const row = htmlTemplate.querySelector(".row")
        multiplicationTable.appendChild(row)

    }

    multiplicationTitle.innerText = number
}


// Eventos
multiplicationform.addEventListener("submit", (e) => {
    e.preventDefault()
    const multiplicationNumber = +numberInput.value
    const multiplicatorNumber = +multiplicadorInput.value
    if(!multiplicationNumber || !multiplicadorInput) return
    createTable(multiplicationNumber, multiplicatorNumber)
})