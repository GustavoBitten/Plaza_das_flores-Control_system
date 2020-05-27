const express = require('express')
const uploadPet = require("../../config/uploadPet"); // multer
const uploadVeiculo = require("../../config/uploadVeiculo"); // multer

const backofficePageController = require('../../controllers/backoffice/backofficePageController');
const blocoController = require('../../controllers/backoffice/blocoController');
const apartamentoController = require('../../controllers/backoffice/apartamentoController');
const moradorController = require('../../controllers/backoffice/moradorController');
const petController = require("../../controllers/backoffice/petController");
const veiculoController = require("../../controllers/backoffice/veiculoContoller");


let route = express.Router()
//rotas a partir daqui!

// Rotas para morador

route.get('/dashboard', backofficePageController.moradorDashboard)
route.get('/perfil', backofficePageController.moradorPerfil)
route.get('/ocorrencias', backofficePageController.moradorOcorrencias)
route.get('/areas-comuns', backofficePageController.moradorAreasComuns)
route.get('/portaria', backofficePageController.moradorPortaria)
route.get('/comunicados', backofficePageController.moradorComunicados)
route.get('/financeiro', backofficePageController.moradorFinanceiro)


// Rotas para os Blocos
route.get('/blocos', blocoController.index)
route.post('/blocos', blocoController.store)

// Rotas para os Apartamentos
route.post('/apartamentos', apartamentoController.store)

// Rotas para os Moradores
route.post('/moradores', moradorController.store)



// Rotas para os Veículos
route.post('/veiculos',uploadVeiculo.any(), veiculoController.store)
route.delete('/delete/:veiculoId',uploadVeiculo.any(), veiculoController.delete)
route.put('/editar/:veiculoId',uploadVeiculo.any(), veiculoController.update) 

// Rotas para os Pets
route.post('/pets',uploadPet.any(), petController.store)
route.delete('/delete/:petId', petController.delete)
route.put('/editar/:petId',uploadPet.any(), petController.update) 

module.exports = route