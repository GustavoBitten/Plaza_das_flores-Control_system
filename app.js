const express = require('express')
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override')


const homePageRouter = require('./routes/homePageRouter')
const moradorRouter = require('./routes/backoffice/moradorRouter')
const portariaRouter = require('./routes/backoffice/portariaRouter')
const sindicoRouter = require('./routes/backoffice/sindicoRouter')
const loginPageRouter = require('./routes/login/loginPageRouter')
const auth = require('./middleware/auth')
const typeUserAuth = require('./middleware/typeUserAuth')

const app = express()
app.set("views", path.join(__dirname, "views"))
app.set('view engine', 'ejs');

app.use(cookieParser());

app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/node_modules"))
app.use(express.static(__dirname + "/source"))
app.use(express.static(__dirname + "/utils"))

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(session({
  secret: '343ji43j4n3jn4jk3n',
  resave: true,
  saveUninitialized: false,
}))

app.use(methodOverride("_method"))

app.use('/', homePageRouter);

app.use('/login', loginPageRouter);

//Para desativar as autenticações só trocar para false o arquivo ativadorAuth.js
app.use('/backoffice/sindico',auth, typeUserAuth, sindicoRouter);
app.use('/backoffice/morador',auth, typeUserAuth, moradorRouter);
app.use('/backoffice/portaria', auth, typeUserAuth, portariaRouter);



app.listen(process.env.PORT || 3000, () => console.log("Esse servidor funcionando corretamente"))
