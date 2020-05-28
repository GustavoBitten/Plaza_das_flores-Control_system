const express = require('express')
const moradorController = require('../../controllers/backoffice/moradorController');
const uploadMorador = require("../../config/uploadMorador"); // multer
const {
    check,
    validationResult,
    body
} = require('express-validator')

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
route.get('/financeiro', backofficePageController.sindicoFinanceiro)

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

route.put('/editarMorador/:moradorId', uploadMorador.any(), moradorController.editar)

// Rotas para comunicados
route.get('/comunicados', comunicadoController.index)
route.get('/comunicados/:id', comunicadoController.show)
route.post('/comunicados', comunicadoController.store)
route.delete('/comunicados/:id', comunicadoController.destroy)

module.exports = route