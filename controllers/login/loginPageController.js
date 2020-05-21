const {Morador} = require('../../models')


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

    console.log(usuario)
    res.render("backoffice/morador/dashboard",{titulo: "titulo"})
  }
  
}
module.exports = loginPageController