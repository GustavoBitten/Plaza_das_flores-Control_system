const express = require('express')

const uploadPet = require("../../config/uploadPet");
const uploadVeiculo = require("../../config/uploadVeiculo");
const uploadFuncionario = require("../../config/uploadFuncionario");
const uploadVisitante = require("../../config/uploadVisitante");
const uploadEmpresa = require("../../config/uploadEmpresa");
const uploadCompromisso = require("../../config/uploadCompromisso");
const uploadOcorrencia = require("../../config/uploadocorrencia");
const uploadDependente = require("../../config/uploadDependente");
const uploadMorador = require("../../config/uploadMorador");


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
const comunicadoController = require('../../controllers/backoffice/comunicadoController')
const correspondenciaController = require('../../controllers/backoffice/correspondenciaController')
const visitanteController = require("../../controllers/backoffice/visitanteController");
const dependenteController = require("../../controllers/backoffice/dependenteController");
const perfilController = require("../../controllers/backoffice/perfilController");


let route = express.Router()
//rotas a partir daqui!

// Rotas para morador

route.get('/dashboard', backofficePageController.moradorDashboard)
//route.get('/ocorrencias', backofficePageController.moradorOcorrencias)
route.get('/areas_comuns', backofficePageController.moradorAreasComuns)
// route.get('/portaria', backofficePageController.moradorPortaria)
// route.get('/comunicados', backofficePageController.moradorComunicados)


// Rotas para os Blocos
route.get('/blocos', blocoController.index)
route.post('/blocos', blocoController.store)

// Rotas para os Apartamentos
route.post('/apartamentos', apartamentoController.store)

// Rotas para os Moradores
route.get('/moradores', backofficePageController.moradorMoradores)
route.post('/moradores', moradorController.store)



// Rotas para os Perfis
route.get('/perfil', backofficePageController.moradorPerfil)
route.put('/perfis/editar/:perfilId',uploadMorador.any(), perfilController.update)
route.put('/perfis/editarPerfil/:perfilId',uploadMorador.any(), perfilController.updatePerfil)


// Rotas para os Dependentes
route.post('/dependentes',uploadDependente.any(), dependenteController.store)
route.delete('/dependentes/delete/:dependenteId',uploadDependente.any(), dependenteController.delete)
route.put('/dependentes/editar/:dependenteId',uploadDependente.any(), dependenteController.update)

// Rotas para os Visitantes
route.post('/visitantes',uploadVisitante.any(), visitanteController.store)
route.delete('/visitantes/delete/:visitanteId',uploadVisitante.any(), visitanteController.delete)
route.put('/visitantes/editar/:visitanteId',uploadVisitante.any(), visitanteController.update)

// Rotas para os Funcionários
route.post('/funcionarios',uploadFuncionario.any(), funcionarioController.store)
route.delete('/funcionarios/delete/:funcionarioId',uploadFuncionario.any(), funcionarioController.delete)
route.put('/funcionarios/editar/:funcionarioId',uploadFuncionario.any(), funcionarioController.update)

// Rotas para as Ocorrências
route.get('/ocorrencias', ocorrenciaController.index)
route.get('/ocorrencias/:ocorrenciaId', ocorrenciaController.show)
route.post('/ocorrenciasMorador',uploadOcorrencia.any(), ocorrenciaController.storeMorador)
route.delete('/ocorrencias/delete/:ocorrenciaId',uploadOcorrencia.any(), ocorrenciaController.delete)
route.put('/ocorrencias/editar/:ocorrenciaId',uploadOcorrencia.any(), ocorrenciaController.update)

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

// Rotas para os Comunicados
route.get('/comunicados', comunicadoController.index)
route.get('/comunicados/getComunicados', comunicadoController.getComunicados)
route.get('/comunicados/:id', comunicadoController.show)

// Rotas para as Correspondencias
route.get('/correspondencias', correspondenciaController.index)
route.get('/correspondencias/getCount', correspondenciaController.getCount)
route.get('/correspondencias/:id', correspondenciaController.show)

// Rotas para as Financeiro
route.get('/financeiro', financeiroController.index)
route.get('/financeiro/:id', financeiroController.show)
route.delete('/financeiro/:id', financeiroController.destroy)
route.post('/financeiro/', financeiroController.create)

module.exports = route
