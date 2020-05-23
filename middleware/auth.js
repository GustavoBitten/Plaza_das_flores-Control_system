const session = require('express-session')

const auth = (req,res,next)=>{
    
    return next()
    
    if(req.session.user == undefined){
        return res.redirect('/login')
        //next()
    }else{
        next()
    }



}
module.exports = auth