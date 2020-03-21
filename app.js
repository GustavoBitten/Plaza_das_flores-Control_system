const express = require('express')


let homePageRouter = require('./routes/homePageRouter')
let backofficePageRouter = require('./routes/backoffice/backofficePageRouter')

let app = express()
app.set('view engine', 'ejs');


app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/node_modules"))
app.use(express.static(__dirname + "/source"))

app.use('/', homePageRouter);
app.use('/backoffice', backofficePageRouter);


app.listen(3000, ()=>console.log("Esse servidor tá livre de corona virus"))