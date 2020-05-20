



const {Bloco,Pet,Visitante} = require('./models/index')




//Bloco.create({bloco:"z"}).then((e)=>console.log(e))




//Bloco.create({bloco:"z"}).then((e)=>console.log(e))

try {
    Visitante.create({nome:"Gustavo",cpf:"49166555428",rg:"1234567951"})
} catch(e){
    console.log(e)
}



