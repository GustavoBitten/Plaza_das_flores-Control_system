const express = require('express')
const backofficePageController = require('../../controllers/backoffice/backofficePageController');

let route = express.Router()
//rotas a partir daqui!

route.get('/morador', backofficePageController.moradorDashboard)
route.get('/morador/dashboard', backofficePageController.moradorDashboard)
route.get('/morador/perfil', backofficePageController.moradorPerfil)

module.exports = route