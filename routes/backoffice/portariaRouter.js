const express = require('express')


const backofficePageController = require('../../controllers/backoffice/backofficePageController');


let route = express.Router()
//rotas a partir daqui!
//Rotas para portaria
route.get('/portaria/moradores', backofficePageController.portariaMoradores)
route.get('/portaria/perfil', backofficePageController.portariaPerfil)
route.get('/portaria/ocorrencias', backofficePageController.portariaOcorrencias)
route.get('/portaria/areas-comuns', backofficePageController.portariaAreasComuns)
route.get('/portaria/correspondencias', backofficePageController.portariaCorrespondencias)
route.get('/portaria/comunicados', backofficePageController.portariaComunicados)


module.exports = route