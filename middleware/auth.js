const session = require('express-session')
const ativadorAuth = require('../utils/ativadorAuth')

const auth = (req,res,next)=>{
    
    if(ativadorAuth){

        if(req.session.user == undefined){
            return res.redirect('/login')
            //next()
        }else{
            next()
        }

    }else{

        const user = {
            id: 1,
            nome: 'gustavo duarte',
            rg: 252336521,
            cpf: 46525895126,
            email: 'teste@teste.com',
            celular: '19931266545',
            bloco_id: 1,
            apartamento_id: 1,
            foto: "SEM FOTO",
            senha: "/çdsgr9ujay~h~tpq3ç9y\o3e47h^´õ34ahuýn´t5we",
            tipo_usuario_id:1,
            status: true,
            token: "34sd34gj",
            created_at: '2020-05-24 20:15:52',
            updated_at: '2020-05-24 20:15:52'
          }

        req.session.user = user

        return next()


    }
    
    

}
module.exports = auth