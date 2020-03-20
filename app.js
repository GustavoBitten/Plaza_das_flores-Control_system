const express = require('express')
let app = express()
app.set('view engine', 'ejs');


let homePageRouter = require('./routes/homePageRouter')



app.use('/', homePageRouter);





app.listen(3000, ()=>console.log("Esse servidor tá livre de corona virus"))