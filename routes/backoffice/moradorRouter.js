const express = require('express')
const upload = require("../../config/upload"); // multer

const backofficePageController = require('../../controllers/backoffice/backofficePageController');
const blocoController = require('../../controllers/backoffice/blocoController');
const apartamentoController = require('../../controllers/backoffice/apartamentoController');
const moradorController = require('../../controllers/backoffice/moradorController');
const petContoller = require("../../controllers/backoffice/petController");


let route = express.Router()
//rotas a partir daqui!

// Rotas para morador
route.get('/morador', backofficePageController.moradorDashboard)
route.get('/morador/dashboard', backofficePageController.moradorDashboard)
route.get('/morador/perfil', backofficePageController.moradorPerfil)
route.get('/morador/ocorrencias', backofficePageController.moradorOcorrencias)
route.get('/morador/areas-comuns', backofficePageController.moradorAreasComuns)
route.get('/morador/portaria', backofficePageController.moradorPortaria)
route.get('/morador/comunicados', backofficePageController.moradorComunicados)
route.get('/morador/financeiro', backofficePageController.moradorFinanceiro)


// Rotas para os Blocos
route.get('/blocos', blocoController.index)
route.post('/blocos', blocoController.store)

// Rotas para os Apartamentos
route.post('/apartamentos', apartamentoController.store)

// Rotas para os Moradores
route.post('/moradores', moradorController.store)

// Rotas para os Pets
//route.get('/pets', petController.index)
route.post('/pets',upload.any(), petContoller.store)
route.get('/pets', petContoller.index)

module.exports = route