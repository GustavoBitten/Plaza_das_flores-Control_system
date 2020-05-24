const express = require('express')
const moradorController = require('../../controllers/backoffice/moradorController');
const uploadMorador = require("../../config/uploadMorador"); // multer

const backofficePageController = require('../../controllers/backoffice/backofficePageController');


let route = express.Router()
//rotas a partir daqui!



// Rotas para síndico
route.get('/sindico/moradores', moradorController.ListaMoradores)
route.get('/sindico/perfil', backofficePageController.sindicoPerfil)
route.get('/sindico/ocorrencias', backofficePageController.sindicoOcorrencias)
route.get('/sindico/areas-comuns', backofficePageController.sindicoAreasComuns)
route.get('/sindico/portaria', backofficePageController.sindicoPortaria)
route.get('/sindico/comunicados', backofficePageController.sindicoComunicados)
route.get('/sindico/financeiro', backofficePageController.sindicoFinanceiro)

// Rotas para os Moradores
route.post('/sindico/moradores',uploadMorador.any(), moradorController.store)

route.put('/sindico/editarMorador/:moradorId',uploadMorador.any(), moradorController.editar)

module.exports = route