const express = require('express')
const homePageController = require('../controllers/homePageController');

let route = express.Router()
//rotas a partir daqui!

route.get('/',homePageController.teste)



module.exports = route