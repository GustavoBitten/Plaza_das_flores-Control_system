const express = require('express')


let homePageRouter = require('./routes/homePageRouter')

let app = express()
app.set('view engine', 'ejs');


app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/node_modules"))

app.use('/', homePageRouter);


app.listen(3000, ()=>console.log("Esse servidor tá livre de corona virus"))