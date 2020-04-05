
let backofficePageController = {
  moradorDashboard: (req,res) => {
    res.render("backoffice/morador/dashboard", {titulo:"Dashboard - Morador"})
  },
  moradorPerfil: (req,res) => {
    res.render("backoffice/morador/perfil", {titulo:"Morador - Perfil"})
  },
  sindicoPerfil: (req,res) => {
    res.render("backoffice/sindico/perfil", {titulo:"Sindico - Perfil"})
  },
  moradorAreasComuns: (req,res) => {
    res.render("backoffice/morador/areasComuns", {titulo: "Áreas Comuns - Morador"})
  },
  sindicoMoradores: (req,res) => {
    res.render("backoffice/sindico/moradores", {titulo:"Moradores - Síndico"})
  },
  portariaPerfil: (req,res) => {
    res.render("backoffice/portaria/perfil", {titulo:"Portaria - Perfil"})
  },
  portariaMoradores: (req,res) => {
    res.render("backoffice/portaria/moradores", {titulo:"Moradores - Portaria"})
  }




}


module.exports = backofficePageController