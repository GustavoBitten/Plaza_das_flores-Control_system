const session = require('express-session')
const ativadorAuth = require('../utils/ativadorAuth')
const {Usuario} = require('../models')

const auth = async (req,res,next)=>{
    
    if(ativadorAuth){

        if(req.session.user == undefined){
            return res.redirect('/login')
            //next()
        }else{
            next()
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