const {Bloco} = require('./models/index')



//Bloco.create({bloco:"z"}).then((e)=>console.log(e))

try {
    Bloco.findAll({raw:true})
} catch(e){
    console.log(e)
}

try {
    Bloco.create({bloco:"z"})
} catch(e){
    console.log(e)
}


