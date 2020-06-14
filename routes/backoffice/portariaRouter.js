const express = require('express')
const { check } = require('express-validator')


const backofficePageController = require('../../controllers/backoffice/backofficePageController');
const comunicadoController = require('../../controllers/backoffice/comunicadoController');
const correspondenciaController = require('../../controllers/backoffice/correspondenciaController');
const financeiroController = require('../../controllers/backoffice/financeiroController')
const ocorrenciaController = require('../../controllers/backoffice/ocorrenciaController')



let route = express.Router()
//rotas a partir daqui!
//Rotas para portaria
route.get('/moradores', backofficePageController.portariaMoradores)
//route.get('/perfil', backofficePageController.portariaPerfil)
route.get('/ocorrencias', ocorrenciaController.index)
route.get('/areas_comuns', backofficePageController.portariaAreasComuns)
// route.get('/correspondencias', backofficePageController.portariaCorrespondencias)
// route.get('/comunicados', backofficePageController.portariaComunicados)
route.get('/dashboard', backofficePageController.moradorDashboard)

// rotas para os Comunicados
route.get('/comunicados', comunicadoController.index)
route.get('/comunicados/getComunicados', comunicadoController.getComunicados)
route.get('/comunicados/:id', comunicadoController.show)

// Rotas para as Correspondencias
route.get('/correspondencias', correspondenciaController.index)
route.get('/correspondencias/getComboValues', correspondenciaController.getComboValues)
route.post('/correspondencias/getMoradorCombo', correspondenciaController.getMoradorCombo)
route.get('/correspondencias/getCorrespondencias', correspondenciaController.getCorrespondencias)
route.post('/correspondencias/getMoradorDependentes', correspondenciaController.getMoradorDependentes)
route.put('/correspondencias/registrarRetirada', correspondenciaController.registrarRetirada)
route.get('/correspondencias/getCount', correspondenciaController.getCount)
route.get('/correspondencias/:id', correspondenciaController.show)
route.post('/correspondencias', [
  check('bloco_id').isInt().withMessage('O campo bloco não pode estar vazio!'),
  check('apartamento_id').isInt().withMessage('O campo apartamento não pode estar vazio!'),
  check('morador_id').isInt().withMessage('Morador não cadastrado no sistema!'),
  check('tipo_correspondencia_id').isInt().withMessage('O campo tipo da encomenda não pode estar vazio!')
], correspondenciaController.store)
route.delete('/correspondencias/:id', correspondenciaController.destroy)

// Rotas para as Financeiro
route.get('/financeiro', financeiroController.index)
route.post('/financeiro/', financeiroController.create)

module.exports = route
