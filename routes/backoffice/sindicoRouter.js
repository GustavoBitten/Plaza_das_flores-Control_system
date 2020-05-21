const express = require('express')


const backofficePageController = require('../../controllers/backoffice/backofficePageController');


let route = express.Router()
//rotas a partir daqui!



// Rotas para síndico
route.get('/sindico/moradores', backofficePageController.sindicoMoradores)
route.get('/sindico/perfil', backofficePageController.sindicoPerfil)
route.get('/sindico/ocorrencias', backofficePageController.sindicoOcorrencias)
route.get('/sindico/areas-comuns', backofficePageController.sindicoAreasComuns)
route.get('/sindico/portaria', backofficePageController.sindicoPortaria)
route.get('/sindico/comunicados', backofficePageController.sindicoComunicados)
route.get('/sindico/financeiro', backofficePageController.sindicoFinanceiro)


module.exports = route