// REFERÊNCIAS
const menu = document.querySelector("#menu")
const cartBtn = document.querySelector("#cart-btn")
const cartModal = document.querySelector("#cart-modal")
const cartItemsContainer = document.querySelector("#cart-items")
const cartTotal = document.querySelector("#cart-total")
const checkoutBtn = document.querySelector("#checkout-btn")
const closeModalBtn = document.querySelector("#close-modal-btn")
const cartCounter = document.querySelector("#cart-count")
const addressInput = document.querySelector("#address")
const addressWarn = document.querySelector("#address-warn")

// ARRAY PARA PEGAR OS ITEM PARA O CARRINHO
let cart = []

// ABRIR O MODAL DO CARRINHO DE PEDIDOS
cartBtn.addEventListener("click", function() {
    updateCartModal()
    cartModal.style.display = "flex"
})

// FECHAR O MODAL QUANDO CLICAR FORA
cartModal.addEventListener("click", function() {
    if ( event.target === cartModal ) {
        cartModal.style.display = "none"
    }
})

// BTN CLOSE MODAL
closeModalBtn.addEventListener("click", function() {
    cartModal.style.display = "none"
})

// ----------------------------------

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        // ADICIONAR NO CARRINHO
        addToCart(name, price)
    }

})

// FUNÇÃO PARA ADICIONAR NO CARRINHO
function addToCart (name, price) {
    // PERCORRE OS ITENS E ADICIONA DENTRO DA VÁRIAVEL
    const existingItem = cart.find(item => item.name === name)
    // SE O ITEM EXISTE, AUMENTA APENAS A QUANTIDADE + 1
    if(existingItem) {
        existingItem.quantity += 1
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }

    updateCartModal()
}

// ATUALIZA VISUALMENTE O CARRINHO
function updateCartModal () {
    cartItemsContainer.innerHTML = ""
    let total = 0

    cart.forEach (item => {
        const cartItemElement = document.createElement("div")
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")
        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium" >${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2" >R$ ${item.price.toFixed(2)}</p>
                </div>


                <button class="remove-form-cart-btn" data-name="${item.name}">
                    Remover
                </button>

            </div>
        `

        total += item.price * item.quantity


        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    cartCounter.innerHTML = cart.length
}

// FUNÇÃO PARA REMOVER OS ITENS DO CARRINHO
cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-form-cart-btn")){
        const name = event.target.getAttribute("data-name")
        
        removeItemCart(name)
    }
})

function removeItemCart (name) {
    const index = cart.findIndex(item => item.name === name)

    if(index !== -1) {
        const item = cart[index]
        
        if(item.quantity > 1) {
            item.quantity -= 1
            updateCartModal()
            return
        }

        cart.splice(index, 1)
        updateCartModal()
    }
}

// PEGAR O ENDEREÇO
addressInput.addEventListener("input", function(event){
    let inputValue = event.target.inputValue
    if(inputValue !== "") {
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})


// FINALIZAR O CARRINHO
checkoutBtn.addEventListener("click", function(){
    // validação horário de funcionamento
    const isOpen = checkRestaurantOpen()
    if(!isOpen){
        Toastify({
            text: "Ops o restaurante está fechado!",
            duration: 3000,

            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#EF4444",
            },
          }).showToast();
        return
    }
    // ---------------------------------

    if(cart.length === 0) return
    if(addressInput.value === "") {
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return
    }
    // Enviar o pedido para api do whatsapp
    const cartItems = cart.map((item)=>{
        return (
            `${item.name} Qantidade: (${item.quantity}) Preço: R$ ${item.price} |`
        )
    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = "92986001560"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")
    
    // Limpar o carrinho
    cart = []

})

// VERIFICA A HORA E MANIPULA O CARD HORÁRIO
function checkRestaurantOpen() {
    const data = new Date()
    const hora = data.getHours()
    return hora >= 18 && hora < 22

}

const spanItemHora = document.querySelector("#date-span")
const isOpen = checkRestaurantOpen()

if(isOpen) {
    spanItemHora.classList.remove("bg-red-500")
    spanItemHora.classList.add("bg-green-600")
} else {
    spanItemHora.classList.remove("bg-green-600")
    spanItemHora.classList.add("bg-red-500")
}
