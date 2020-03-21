const express = require('express')
const loginPageController = require('../../controllers/login/loginPageController');

let route = express.Router()
//rotas a partir daqui!

route.get('/login', loginPageController.login)



module.exports = route