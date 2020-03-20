const express = require('express')


let homePageRouter = require('./routes/homePageRouter')

let app = express()
app.set('view engine', 'ejs');


app.use(express.static("public"))
app.use(express.static("node_modules"))

app.use('/', homePageRouter);





app.listen(3000, ()=>console.log("Esse servidor tá livre de corona virus"))