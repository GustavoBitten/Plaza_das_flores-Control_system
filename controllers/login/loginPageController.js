const express = require('express')
const app = express() 
const {Usuario} = require('../../models')
const session = require('express-session')
const bcrypt = require('bcrypt')


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
      let erro = 'Usuário não encontrado, por favor contate o síndico'
      return res.render("login/login", {titulo:"Acesso",erro})
    }

    if (usuario.status == false) {
      let erro = 'Usuário desativado, por favor contate o síndico'
      return res.render("login/login", {titulo:"Acesso",erro})
    }

    if (!bcrypt.compareSync(senha,usuario.senha)){
      let erro = "Senha incorreta, tente novamente ou use a opção 'esqueci minha senha'"
      return res.render("login/login", {titulo:"Acesso",erro})
    }

    usuario.senha = ''
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
        res.redirect('/login')
        break;
    }

    
  
}

}
module.exports = loginPageController