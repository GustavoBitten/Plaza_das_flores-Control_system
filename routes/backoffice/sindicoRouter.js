const express = require('express')
const moradorController = require('../../controllers/backoffice/moradorController');
const uploadMorador = require("../../config/uploadMorador"); // multer

const backofficePageController = require('../../controllers/backoffice/backofficePageController');
const comunicadoController = require('../../controllers/backoffice/comunicadoController');


let route = express.Router()
//rotas a partir daqui!


// Rotas para síndico
route.get('/moradores', moradorController.ListaMoradores)
route.get('/perfil', backofficePageController.sindicoPerfil)
route.get('/ocorrencias', backofficePageController.sindicoOcorrencias)
route.get('/areas-comuns', backofficePageController.sindicoAreasComuns)
route.get('/portaria', backofficePageController.sindicoPortaria)
/* route.get('/comunicados', backofficePageController.sindicoComunicados) */
route.get('/financeiro', backofficePageController.sindicoFinanceiro)

// Rotas para os Moradores
route.post('/moradores', uploadMorador.any(), moradorController.store)

route.put('/editarMorador/:moradorId', uploadMorador.any(), moradorController.editar)

// Rotas para comunicados
route.get('/comunicados', comunicadoController.index)
route.post('/comunicados', comunicadoController.store)

module.exports = route