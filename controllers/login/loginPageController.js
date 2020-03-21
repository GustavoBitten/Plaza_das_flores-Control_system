
let loginPageController = {
  login: (req,res) => {
    res.render("login/login", {titulo:"Acesso"})
  }
}


module.exports = loginPageController