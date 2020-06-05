let avancar_comunicados = document.getElementById("avancar_comunicados")
let regredir_comunicados = document.getElementById("regredir_comunicados")
let texto_comunicados = document.getElementById("texto_comunicados")
let comunicados = JSON.parse(document.getElementById("comunicados").innerHTML)
let cont_comunicados = 0
let iniciar_comunicados = document.getElementById("iniciar_comunicados")

iniciar_comunicados.addEventListener("click",(e)=>{
    if(comunicados.length>1){
        cont_comunicados=0
        texto_comunicados.innerText=comunicados[0].mensagem
}})

avancar_comunicados.addEventListener("click",(e)=>{
    if(comunicados.length>1){
    if(cont_comunicados<comunicados.length){
        cont_comunicados++
        texto_comunicados.innerText=comunicados[cont_comunicados].mensagem}
}})

regredir_comunicados.addEventListener("click",(e)=>{
    if(comunicados.length>1){
    if(cont_comunicados>0){
        cont_comunicados--
        texto_comunicados.innerText=comunicados[cont_comunicados].mensagem}
}})



let avancar_ocorrencias = document.getElementById("avancar_ocorrencias")
let regredir_ocorrencias = document.getElementById("regredir_ocorrencias")
let texto_ocorrencias = document.getElementById("texto_ocorrencias")
let ocorrencias = JSON.parse(document.getElementById("ocorrencias").innerHTML)
let cont_ocorrencias = 0
let iniciar_ocorrencias = document.getElementById("iniciar_ocorrencias")

iniciar_ocorrencias.addEventListener("click",(e)=>{
    if(ocorrencias.length>1){
        cont_ocorrencias=0
        texto_ocorrencias.innerText=ocorrencias[0].mensagem
}})

avancar_ocorrencias.addEventListener("click",(e)=>{
    if(ocorrencias.length>1){
    if(cont_ocorrencias<ocorrencias.length){
        cont_ocorrencias++
        texto_ocorrencias.innerText=ocorrencias[cont_ocorrencias].mensagem}
}})

regredir_ocorrencias.addEventListener("click",(e)=>{
    if(ocorrencias.length>1){
    if(cont_ocorrencias>0){
        cont_ocorrencias--
        texto_ocorrencias.innerText=ocorrencias[cont_ocorrencias].mensagem}
}})



let avancar_encomendas = document.getElementById("avancar_encomendas")
let regredir_encomendas = document.getElementById("regredir_encomendas")
let texto_encomendas = document.getElementById("texto_encomendas")
let encomendas = JSON.parse(document.getElementById("encomendas").innerHTML)
let cont_encomendas = 0
let iniciar_encomendas = document.getElementById("iniciar_encomendas")

iniciar_encomendas.addEventListener("click",(e)=>{
    if(encomendas.length>1){
        cont_encomendas=0
        texto_encomendas.innerText=encomendas[0].descricao
}})

avancar_encomendas.addEventListener("click",(e)=>{
    if(encomendas.length>1){
    if(cont_encomendas<encomendas.length){
        cont_encomendas++
        texto_encomendas.innerText=encomendas[cont_encomendas].descricao}
}})

regredir_encomendas.addEventListener("click",(e)=>{
    if(encomendas.length>1){
    if(cont_encomendas>0){
        cont_encomendas--
        texto_encomendas.innerText=encomendas[cont_encomendas].descricao}
}})



let avancar_multas = document.getElementById("avancar_multas")
let regredir_multas = document.getElementById("regredir_multas")
let texto_multas = document.getElementById("texto_multas")
let multas = JSON.parse(document.getElementById("multas").innerHTML)
let cont_multas = 0
let iniciar_multas = document.getElementById("iniciar_encomendas")

iniciar_encomendas.addEventListener("click",(e)=>{
    if(multas.length>1){
        cont_encomendas=0
        texto_encomendas.innerText=multas[0].descricao
}})

avancar_multas.addEventListener("click",(e)=>{
    if(multas.length>1){
    if(cont_multas<multas.length){
        cont_multas++
        texto_multas.innerText=multas[cont_multas].descricao}
}})

regredir_multas.addEventListener("click",(e)=>{
    if(multas.length>1){
    if(cont_multas>0){
        cont_multas--
        texto_multas.innerText=multas[cont_multas].descricao}
}})



let avancar_notificacoes = document.getElementById("avancar_notificacoes")
let regredir_notificacoes = document.getElementById("regredir_notificacoes")
let texto_notificacoes = document.getElementById("texto_notificacoes")
let notificacoes = JSON.parse(document.getElementById("notificacoes").innerHTML)
let cont_notificacoes = 0
let iniciar_notificacoes = document.getElementById("iniciar_encomendas")

iniciar_encomendas.addEventListener("click",(e)=>{
    if(notificacoes.length>1){
        cont_encomendas=0
        texto_encomendas.innerText=notificacoes[0].descricao
}})

avancar_notificacoes.addEventListener("click",(e)=>{
    if(notificacoes.length>1){
    if(cont_notificacoes<notificacoes.length){
        cont_notificacoes++
        texto_notificacoes.innerText=notificacoes[cont_notificacoes].descricao}
}})

regredir_notificacoes.addEventListener("click",(e)=>{
    if(notificacoes.length>1){
    if(cont_notificacoes>0){
        cont_notificacoes--
        texto_notificacoes.innerText=notificacoes[cont_notificacoes].descricao}
}})