
let backofficePageController = {
  moradorDashboard: (req,res) => {
    res.render("backoffice/morador/dashboard", {titulo:"Dashboard - Morador"})
  },
  moradorPerfil: (req,res) => {
    res.render("backoffice/morador/perfil", {titulo:"Perfil - Morador"})
  },
  sindicoMoradores: (req,res) => {
    res.render("backoffice/sindico/moradores", {titulo:"Sindico - Moradores"})
  }




}


module.exports = backofficePageController