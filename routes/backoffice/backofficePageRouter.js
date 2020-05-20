const express = require('express')
const backofficePageController = require('../../controllers/backoffice/backofficePageController');
const blocoController = require('../../controllers/backoffice/blocoController');
const apartamentoController = require('../../controllers/backoffice/apartamentoController');

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


// Rotas para síndico
route.get('/sindico/moradores', backofficePageController.sindicoMoradores)
route.get('/sindico/perfil', backofficePageController.sindicoPerfil)
route.get('/sindico/ocorrencias', backofficePageController.sindicoOcorrencias)
route.get('/sindico/areas-comuns', backofficePageController.sindicoAreasComuns)
route.get('/sindico/portaria', backofficePageController.sindicoPortaria)
route.get('/sindico/comunicados', backofficePageController.sindicoComunicados)
route.get('/sindico/financeiro', backofficePageController.sindicoFinanceiro)

//Rotas para portaria
route.get('/portaria/moradores', backofficePageController.portariaMoradores)
route.get('/portaria/perfil', backofficePageController.portariaPerfil)
route.get('/portaria/ocorrencias', backofficePageController.portariaOcorrencias)
route.get('/portaria/areas-comuns', backofficePageController.portariaAreasComuns)
route.get('/portaria/correspondencias', backofficePageController.portariaCorrespondencias)
route.get('/portaria/comunicados', backofficePageController.portariaComunicados)

// Rotas para os Blocos
route.get('/blocos', blocoController.index)
route.post('/blocos', blocoController.store)

// Rotas para os Apartamentos
route.post('/apartamentos', apartamentoController.store)

module.exports = route