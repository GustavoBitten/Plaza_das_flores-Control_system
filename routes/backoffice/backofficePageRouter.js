const express = require('express')
const backofficePageController = require('../../controllers/backoffice/backofficePageController');

let route = express.Router()
//rotas a partir daqui!

// Rotas para morador
route.get('/morador', backofficePageController.moradorDashboard)
route.get('/morador/dashboard', backofficePageController.moradorDashboard)
route.get('/morador/perfil', backofficePageController.moradorPerfil)
route.get('/morador/areas-comuns', backofficePageController.moradorAreasComuns)


// Rotas para síndico
route.get('/sindico/moradores', backofficePageController.sindicoMoradores)

//Rotas para portaria
route.get('/portaria/moradores', backofficePageController.portariaMoradores)


module.exports = route