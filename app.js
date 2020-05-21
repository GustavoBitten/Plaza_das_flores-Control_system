const express = require('express')
const path = require('path')
const session = require('express-session')


let homePageRouter = require('./routes/homePageRouter')
let moradorRouter = require('./routes/backoffice/moradorRouter')
let portariaRouter = require('./routes/backoffice/portariaRouter')
let sindicoRouter = require('./routes/backoffice/sindicoRouter')
let loginPageRouter = require('./routes/login/loginPageRouter')
const auth = require('./middleware/auth')

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
app.use(session({
  'secret': '343ji43j4n3jn4jk3n'
}))

app.use('/', homePageRouter);
app.use('/backoffice', auth, moradorRouter);
app.use('/backoffice', auth, portariaRouter);
app.use('/backoffice', auth, sindicoRouter);

app.use('/login', loginPageRouter);


app.listen(3000, () => console.log("Esse servidor funcionando corretamente"))