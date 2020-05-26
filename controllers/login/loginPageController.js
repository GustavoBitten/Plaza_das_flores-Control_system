const express = require('express')
const app = express() 
const {Usuario} = require('../../models')
const session = require('express-session')


const  loginPageController = {
  login: (req,res) => {
    res.render("login/login", {titulo:"Acesso"})
  },
  
  auth: async (req,res) => {
    const {email,senha} = req.body

    console.log(email,senha)
    const usuario = await Usuario.findOne({
      where: {email}
    })

    if (usuario == undefined) {
      res.render("login/login", {titulo:"Acesso"})
      console.log('passou aqui')
      let erro = 'deu ruim'
      app.locals.erro = erro
    }else{

    }




    usuario.senha = ''
    //console.log(usuario)
    req.session.user = usuario
    
    switch (usuario.tipo_usuario_id) {

      case 1:
        res.redirect("/backoffice/morador/dashboard")
        break;
      case 2:
        res.redirect("/backoffice/sindico/moradores")
        break;
      case 3:
        res.redirect("/backoffice/portaria/perfil")
        break;
  
      default:
        break;
    }

    
  
}

}
module.exports = loginPageController