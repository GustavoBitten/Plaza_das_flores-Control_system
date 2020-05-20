



const {Bloco,Pet,Visitante,Morador} = require('./models/index')




//Bloco.create({bloco:"z"}).then((e)=>console.log(e))




//Bloco.create({bloco:"z"}).then((e)=>console.log(e))

try {
    Morador.findAll({raw:true}).then((e)=>console.log(e))
} catch(e){
    console.log(e)
}



