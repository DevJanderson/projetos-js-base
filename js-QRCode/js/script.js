// Pegar os elementos
const container = document.querySelector(".conteiner");
const qrCodeBtn = document.querySelector("#qr-form button");
const qrCodeInput = document.querySelector("#qr-form input"); 

const qrCodeImg = document.querySelector("#qr-code img")

// Funções
function generateQrCode() {
  // função que gera o QRcode
  const qrCodeInputValue = qrCodeInput.value;
  if (!qrCodeInputValue) return; 
  qrCodeBtn.innerText = "Gerando QR Code..."

  qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrCodeInputValue} `

  qrCodeImg.addEventListener("load", () => {
    container.classList.add("active")
    qrCodeBtn.innerText = "QR Code criado!!!"
  })

}

// Eventos
qrCodeBtn.addEventListener("click", () => {
  generateQrCode();
});

qrCodeInput.addEventListener("keydown", (e) => {
  if(e.code === "Enter"){
    generateQrCode();
  }
});

// Limpar área do QRCode gerado
qrCodeInput.addEventListener("keyup", ()=>{
  if(!qrCodeInput.value){
    container.classList.remove("active")
    qrCodeBtn.innerHTML = "Código criado"
  }
})