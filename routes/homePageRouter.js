const express = require('express')
const homePageController = require('../controllers/homePageController');

let route = express.Router()
//rotas a partir daqui!

route.get('/',homePageController.index)
route.post('/',homePageController.create)



module.exports = route