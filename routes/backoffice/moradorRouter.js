const express = require('express')
const uploadPet = require("../../config/uploadPet"); 
const uploadVeiculo = require("../../config/uploadVeiculo"); 
const uploadFuncionario = require("../../config/uploadFuncionario"); 
const uploadVisitante = require("../../config/uploadVisitante"); 
const uploadEmpresa = require("../../config/uploadEmpresa"); 
const uploadCompromisso = require("../../config/uploadCompromisso"); 
const uploadOcorrencia = require("../../config/uploadocorrencia"); 

const backofficePageController = require('../../controllers/backoffice/backofficePageController');
const blocoController = require('../../controllers/backoffice/blocoController');
const apartamentoController = require('../../controllers/backoffice/apartamentoController');
const moradorController = require('../../controllers/backoffice/moradorController');
const petController = require("../../controllers/backoffice/petController");
const veiculoController = require("../../controllers/backoffice/veiculoContoller");
const compromissoController = require("../../controllers/backoffice/compromissoController");
const empresaController = require("../../controllers/backoffice/empresaController");
const funcionarioController = require('../../controllers/backoffice/funcionarioController');
const ocorrenciaController = require("../../controllers/backoffice/ocorrenciaController");
const financeiroController = require('../../controllers/backoffice/financeiroController')
//const visitanteController = require("../../controllers/backoffice/visitanteController");


let route = express.Router()
//rotas a partir daqui!

// Rotas para morador

route.get('/dashboard', backofficePageController.moradorDashboard)
route.get('/perfil', backofficePageController.moradorPerfil)
//route.get('/ocorrencias', backofficePageController.moradorOcorrencias)
route.get('/areas-comuns', backofficePageController.moradorAreasComuns)
route.get('/portaria', backofficePageController.moradorPortaria)
route.get('/comunicados', backofficePageController.moradorComunicados)
route.get('/financeiro', financeiroController.index)


// Rotas para os Blocos
route.get('/blocos', blocoController.index)
route.post('/blocos', blocoController.store)

// Rotas para os Apartamentos
route.post('/apartamentos', apartamentoController.store)

// Rotas para os Moradores
route.post('/moradores', moradorController.store)



/*
// Rotas para os Visitantes
route.post('/visitantes',uploadVisitante.any(), visitanteController.store)
route.delete('/visitantes/delete/:visitanteId',uploadVisitante.any(), visitanteController.delete)
route.put('/vistantes/editar/:visitanteId',uploadVisitante.any(), visitanteController.update) 
*/

// Rotas para as Ocorrências
route.get('/ocorrencias', ocorrenciaController.index)
route.post('/ocorrenciasMorador',uploadOcorrencia.any(), ocorrenciaController.storeMorador)
route.post('/ocorrenciasSindico',uploadOcorrencia.any(), ocorrenciaController.storeSindico)
route.delete('/ocorrencias/delete/:ocorrenciaId',uploadOcorrencia.any(), ocorrenciaController.delete)
route.put('/ocorrencias/editar/:ocorrenciaId',uploadOcorrencia.any(), ocorrenciaController.update) 

// Rotas para os Funcionários
route.post('/funcionarios',uploadFuncionario.any(), funcionarioController.store)
route.delete('/funcionarios/delete/:funcionarioId',uploadFuncionario.any(), funcionarioController.delete)
route.put('/funcionarios/editar/:funcionarioId',uploadFuncionario.any(), funcionarioController.update) 

// Rotas para os Empresas
route.post('/empresas',uploadEmpresa.any(), empresaController.store)
route.delete('/empresas/delete/:empresaId',uploadEmpresa.any(), empresaController.delete)
route.put('/empresas/editar/:empresaId',uploadEmpresa.any(), empresaController.update)

// Rotas para os Compromissos
route.post('/compromissos',uploadCompromisso.any(), compromissoController.store)
route.delete('/compromissos/delete/:compromissoId',uploadCompromisso.any(), compromissoController.delete)
route.put('/compromissos/editar/:compromissoId',uploadCompromisso.any(), compromissoController.update) 

// Rotas para os Veículos
route.post('/veiculos',uploadVeiculo.any(), veiculoController.store)
route.delete('/veiculos/delete/:veiculoId',uploadVeiculo.any(), veiculoController.delete)
route.put('/veiculos/editar/:veiculoId',uploadVeiculo.any(), veiculoController.update) 

// Rotas para os Pets
route.post('/pets',uploadPet.any(), petController.store)
route.delete('/pets/delete/:petId', petController.delete)
route.put('/pets/editar/:petId',uploadPet.any(), petController.update) 

module.exports = route