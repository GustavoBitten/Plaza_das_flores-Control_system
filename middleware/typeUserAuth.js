const session = require('express-session')
const ativadorAuth = require('../utils/ativadorAuth')
const {Usuario} = require('../models')

const typeUserAuth = (req,res,next)=>{
    
    if(ativadorAuth){

        const url = req.originalUrl
        const urlParts = url.split('/')
        const typeRoute = urlParts[2]
        
        const userType = req.session.user.tipo_usuario_id
       
        switch (typeRoute) {
            case "morador":
                
                switch (userType) {
                    case 2:
                        res.redirect('/login')
                        break;
                    case 3:
                        res.redirect('/login')
                        break;
                    case 1:
                        next()
                        break;
                    default:
                        res.redirect('/login')
                        break;
                }

                break;
        
            case "sindico":
            
                switch (userType) {
                    case 1:
                        res.redirect('/login')
                        break;
                    case 3:
                        res.redirect('/login')
                        break;
                    case 2:
                        next()
                        break;
                    default:
                        res.redirect('/login')
                        break;
                }

                break;

            case "portaria":
            
                switch (userType) {
                    case 1:
                        res.redirect('/login')
                        break;
                    case 2:
                        res.redirect('/login')
                        break;
                    case 3:
                        next()
                    default:
                        res.redirect('/login')
                        break;
                }

                break;



            default:
                res.redirect('/login')
                break;
        }





    } else{

       next()

    }
    
    

}
module.exports = typeUserAuth