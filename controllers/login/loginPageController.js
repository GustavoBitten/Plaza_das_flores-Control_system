const {Morador} = require('../../models')
const session = require('express-session')


const  loginPageController = {
  login: (req,res) => {
    res.render("login/login", {titulo:"Acesso"})
  },
  
  auth: async (req,res) => {
    const {email,senha} = req.body
    console.log(email,senha)
    const usuario = await Morador.findOne({
      where: {email}
    })

    //console.log(usuario)
    
    req.session.user = usuario
    console.log(req.session.user)
    res.redirect("backoffice/morador/dashboard")
  }
  
}
module.exports = loginPageController