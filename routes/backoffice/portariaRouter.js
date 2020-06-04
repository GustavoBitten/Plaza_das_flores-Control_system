const express = require('express')


const backofficePageController = require('../../controllers/backoffice/backofficePageController');
const comunicadoController = require('../../controllers/backoffice/comunicadoController');
const correspondenciaController = require('../../controllers/backoffice/correspondenciaController');


let route = express.Router()
//rotas a partir daqui!
//Rotas para portaria
route.get('/moradores', backofficePageController.portariaMoradores)
//route.get('/perfil', backofficePageController.portariaPerfil)
//route.get('/ocorrencias', backofficePageController.portariaOcorrencias)
route.get('/areas-comuns', backofficePageController.portariaAreasComuns)
// route.get('/correspondencias', backofficePageController.portariaCorrespondencias)
// route.get('/comunicados', backofficePageController.portariaComunicados)

// rotas para os Comunicados
route.get('/comunicados', comunicadoController.index)
route.get('/comunicados/getComunicados', comunicadoController.getComunicados)
route.get('/comunicados/:id', comunicadoController.show)

// Rotas para as Correspondencias
route.get('/correspondencias', correspondenciaController.index)


module.exports = route
