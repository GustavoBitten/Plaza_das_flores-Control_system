const express = require('express')
const loginPageController = require('../../controllers/login/loginPageController');

let route = express.Router()
//rotas a partir daqui!

route.get('/', loginPageController.login)
route.post('/', loginPageController.auth)



module.exports = route