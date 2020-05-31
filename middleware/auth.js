const session = require('express-session')
const ativadorAuth = require('../utils/ativadorAuth')
const {Usuario} = require('../models')

const auth = async (req,res,next)=>{
    
    if(ativadorAuth){

        if(req.session.user != undefined ){
            return next()
        }else if(req.cookies.user){
            const user = await Usuario.findOne({where:{
                token: req.cookies.user,
                status: true
            }})
            console.log(user)

            if(user){
                req.session.user = user
                return next()
            }
            return res.redirect('/login')
            
        }else{
            return res.redirect('/login')
        }

    } else{

        if(req.session.user == undefined){
            const user = await Usuario.findByPk('2') 
            req.session.user = user
            return next()

        }else{
            return next()
        }

    }
    
    

}
module.exports = auth