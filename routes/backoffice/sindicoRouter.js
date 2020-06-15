const express = require('express')
const porteiroCadController = require('../../controllers/backoffice/porteiroCadController');
const moradorController = require('../../controllers/backoffice/moradorController');
const uploadMorador = require("../../config/uploadMorador"); // multer
const uploadOcorrencia = require("../../config/uploadocorrencia");
const uploadPorteiro = require("../../config/uploadPorteiro"); // multer
const {
  check,
  validationResult,
  body
} = require('express-validator')

const backofficePageController = require('../../controllers/backoffice/backofficePageController');
const comunicadoController = require('../../controllers/backoffice/comunicadoController');
const correspondenciaController = require('../../controllers/backoffice/correspondenciaController');
const financeiroController = require('../../controllers/backoffice/financeiroController')
const ocorrenciaController = require('../../controllers/backoffice/ocorrenciaController')



let route = express.Router()
//rotas a partir daqui!


// Rotas para síndico
route.get('/usuarios', moradorController.ListaMoradores)
route.get('/moradores', moradorController.buscaUsuario)
//route.get('/perfil', backofficePageController.sindicoPerfil)
route.get('/ocorrencias', ocorrenciaController.index)
route.get('/areas_comuns', backofficePageController.sindicoAreasComuns)
// route.get('/portaria', backofficePageController.sindicoPortaria)
//route.get('/financeiro', backofficePageController.sindicoFinanceiro)
route.get('/dashboard', backofficePageController.moradorDashboard)

// Rotas para os Moradores
route.post('/moradores', uploadMorador.any(), [
  check("nome").isString().withMessage("Formato de nome invalido"),
  check("email").isEmail().withMessage("Formato de email invalido"),
  check("cpf").isNumeric().isLength({
    min: 11,
    max: 11
  }).withMessage("Formato de cpf invalido"),
  check("rg").isNumeric().withMessage("Formato de rg invalido"),
  body('email').custom(async function (value) {
    //verifica email no DB, retorna erro se achar
    const result = await moradorController.existeEmail(value)
    return result
  }),
  body('cpf').custom(async function (value) {
    //verifica cpf no DB, retorna erro se achar
    const result = await moradorController.existeCPF(value)
    return result
  }),


], moradorController.store)

//rota para cad porteiros
route.post('/porteiros', uploadPorteiro.any(), [
  check("nome").isString().withMessage("Formato de nome invalido"),
  check("email").isEmail().withMessage("Formato de email invalido"),
  check("cpf").isNumeric().isLength({
    min: 11,
    max: 11
  }).withMessage("Formato de cpf invalido"),
  check("rg").isNumeric().withMessage("Formato de rg invalido"),
  body('email').custom(async function (value) {
    //verifica email no DB, retorna erro se achar
    const result = await porteiroCadController.existeEmail(value)
    return result
  }),
  body('cpf').custom(async function (value) {
    //verifica cpf no DB, retorna erro se achar
    const result = await porteiroCadController.existeCPF(value)
    return result
  }),


], porteiroCadController.store)
//put de porteiro
route.put('/editarPorteiro/:porteiroId', uploadMorador.any(), porteiroCadController.editar)
//put de morador
route.put('/editarMorador/:moradorId', uploadMorador.any(), moradorController.editar)

//put status
route.put('/editaStatus/:id/:status', moradorController.desativa)

//put reseta senha
route.put('/resetaSenha/:id/:cpf', moradorController.reseteSenha)

// Rotas para os Comunicados
route.get('/comunicados', comunicadoController.index)
route.get('/comunicados/getComunicados', comunicadoController.getComunicados)
route.get('/comunicados/:id', comunicadoController.show)
route.post('/comunicados', [
  check('titulo').isLength({
    min: 1,
    max: 255
  }).withMessage('O título não pode estar vazio e deve conter ao máximo 255 caracteres!'),
  check('mensagem').isLength({
    min: 2,
    max: 1000
  }).withMessage('A mensagem não pode estar vazia e deve conter ao máximo 1.000 caracteres!')
], comunicadoController.store)
route.put('/comunicados/:id', [
  check('titulo').isLength({
    min: 1,
    max: 255
  }).withMessage('O título não pode estar vazio e deve conter ao máximo 255 caracteres!'),
  check('mensagem').isLength({
    min: 2,
    max: 1000
  }).withMessage('A mensagem não pode estar vazia e deve conter ao máximo 1.000 caracteres!')
], comunicadoController.update)
route.delete('/comunicados/:id', comunicadoController.destroy)

// Rotas para as Correspondencias
route.get('/correspondencias', correspondenciaController.index)
route.get('/correspondencias/getCount', correspondenciaController.getCount)
route.get('/correspondencias/:id', correspondenciaController.show)

// Rotas para as Ocorrências
route.get('/ocorrencias', ocorrenciaController.index)
route.get('/ocorrencias/:ocorrenciaId', ocorrenciaController.show)
route.post('/ocorrenciasMorador',uploadOcorrencia.any(), ocorrenciaController.storeMorador)
route.delete('/ocorrencias/delete/:ocorrenciaId',uploadOcorrencia.any(), ocorrenciaController.delete)
route.put('/ocorrencias/editar/:ocorrenciaId',uploadOcorrencia.any(), ocorrenciaController.update)

// Rotas para as Financeiro
route.get('/financeiro', financeiroController.index)
route.delete('/financeiro/:id', financeiroController.destroy)
route.post('/financeiro/', financeiroController.create)


module.exports = route
