const caixaVisitantes = document.getElementById("visitantes")
const botaoVisitantes = document.getElementById("botaoVisitantes")
const caixaFuncionarios = document.getElementById("funcionarios")
const botaoFuncionarios = document.getElementById("botaoFuncionarios")
let cont = 0

botaoVisitantes.addEventListener("click",(e)=>{
  if(cont==1){
    cont--
    caixaFuncionarios.style.display = "none"
    caixaVisitantes.style.display = "block"
  }
})

botaoFuncionarios.addEventListener("click",(e)=>{
  if(cont==0){
    cont++
    caixaVisitantes.style.display = "none"
    caixaFuncionarios.style.display = "block"
  }
})