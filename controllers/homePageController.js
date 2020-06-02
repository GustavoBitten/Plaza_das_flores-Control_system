const transporter = require('../config/nodemailer.js')

const homePageController = {
    teste: (req,res) => {
        
      //teste e-mail
        
    const message = {
        from: 'plazadasfloresdh@gmail.com',
        to:'gustavoduarte1999@gmail.com',
        subject:'Teste com sucesso',
        text: 'Corpo do texto',
        html: ''
    }

    transporter.sendMail(message,(err,info)=>{
        if(err){
            console.log('Deu ruim')
        }else{
            console.log('Sucesso')
        }

    })
    
     //teste e-mail
        res.render("index",{titulo:"Plaza das Flores"})


}}
 
module.exports = homePageController