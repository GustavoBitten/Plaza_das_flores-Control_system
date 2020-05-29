const express = require('express')


const backofficePageController = require('../../controllers/backoffice/backofficePageController');


let route = express.Router()
//rotas a partir daqui!
//Rotas para portaria
route.get('/moradores', backofficePageController.portariaMoradores)
//route.get('/perfil', backofficePageController.portariaPerfil)
route.get('/ocorrencias', backofficePageController.portariaOcorrencias)
route.get('/areas-comuns', backofficePageController.portariaAreasComuns)
route.get('/correspondencias', backofficePageController.portariaCorrespondencias)
route.get('/comunicados', backofficePageController.portariaComunicados)


module.exports = route