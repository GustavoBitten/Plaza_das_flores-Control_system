
let backofficePageController = {
  moradorDashboard: (req,res) => {
    res.render("backoffice/morador/dashboard", {titulo:"Morador - Dashboard"})
  },
  moradorPerfil: (req,res) => {
    res.render("backoffice/morador/perfil", {titulo:"Morador - Perfil"})
  },
  moradorOcorrencias: (req,res) => {
    res.render("backoffice/morador/ocorrencias", {titulo:"Morador - Ocorrências"})
  },
  moradorAreasComuns: (req,res) => {
    res.render("backoffice/morador/areasComuns", {titulo: "Morador - Áreas Comuns"})
  },
  sindicoPerfil: (req,res) => {
    res.render("backoffice/sindico/perfil", {titulo:"Sindico - Perfil"})
  },
  sindicoOcorrencias: (req,res) => {
    res.render("backoffice/sindico/ocorrencias", {titulo:"Sindico - Ocorrências"})
  },
  sindicoMoradores: (req,res) => {
    res.render("backoffice/sindico/moradores", {titulo:"Síndico - Moradores"})
  },
  portariaPerfil: (req,res) => {
    res.render("backoffice/portaria/perfil", {titulo:"Portaria - Perfil"})
  },
  portariaOcorrencias: (req,res) => {
    res.render("backoffice/portaria/ocorrencias", {titulo:"Portaria - Ocorrências"})
  },
  portariaMoradores: (req,res) => {
    res.render("backoffice/portaria/moradores", {titulo:"Portaria - Moradores"})
  }




}


module.exports = backofficePageController