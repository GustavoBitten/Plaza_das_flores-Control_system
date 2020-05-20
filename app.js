const express = require('express')
const path = require('path')


let homePageRouter = require('./routes/homePageRouter')
let backofficePageRouter = require('./routes/backoffice/backofficePageRouter')
let loginPageRouter = require('./routes/login/loginPageRouter')

let app = express()
app.set("views", path.join(__dirname, "views"))
app.set('view engine', 'ejs');


app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/node_modules"))
app.use(express.static(__dirname + "/source"))

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

app.use('/', homePageRouter);
app.use('/backoffice', backofficePageRouter);
app.use('/login', loginPageRouter);


app.listen(3000, () => console.log("Esse servidor funcionando corretamente"))