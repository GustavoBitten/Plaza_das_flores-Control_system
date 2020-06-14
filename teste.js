// const teste = new Date(new Date().setMilliseconds(5*24*60*60*1000) )



//  console.log(teste)

//  class Item {
//     constructor(name,icon){
//         this.name = name
//         this.href = this.href
//         this.icon = icon
//     }
// }

// const perfil = new Item('Teste','teste1')

// console.log(perfil.href)
// console.log(perfil.icon)
// console.log(perfil.name)

var person = {fname:"John", lname:"Doe", age:25}; 
var x;
var txt = ''
for (x in person) {
  txt += person[x] + " " + x + ''
}

console.log(txt)

const baseUrl = 'http://www.sicadi.com.br/mhouse/boleto/boleto3.php?'

const data = {
  numero_banco:'341-7',
  local_pagamento: 'Pagavel em qualquer banco'
}


// cedente=Plaza+das+floes+Condominio&
// data_documento=14%2F06%2F2020&
// numero_documento=DF+00113&
// especie=&
// aceite=N&
// data_processamento=14%2F06%2F2020&
// uso_banco=Sr.+Caixa+n%E3o+receber&
// carteira=179&
// especie_moeda=Real&
// quantidade=&
// valor=&
// vencimento=20%2F06%2F2020&
// agencia=0049&
// codigo_cedente=10201-5&
// meunumero=00010435&
// valor_documento=260%2C00&
// instrucoes=Taxa+de+visita+de+suporte%0D%0AAp%F3s+o+vencimento+R%24+0%2C80+ao+dia&
// mensagem1=Linha+1&
// mensagem2=Linha+2+&
// mensagem3=Linha+3&
// sacado=Usu%E1rio+emissor&
// Submit=Enviar

var fullUrl = baseUrl
for( parameter in data  ){
  fullUrl = fullUrl + parameter + '=' + data[parameter] + '&'
}

console.log(fullUrl)