const transporter = require('../config/nodemailer.js')

const homePageController = {
    index: (req,res) => {
    
        res.render("index",{titulo:"Plaza das Flores"})

    },
    create: async (req,res) => {
        
        const {nome,celular, email, assunto, descricao } = req.body
          
        const message = {
          from: 'plazadasfloresdh@gmail.com',
          to:'gustavoduarte1999@gmail.com',
          subject:`Contato pelo Site: ${assunto}`,
          html: `<h1> Você recebeu um contato por meio do site do condomínio </h1>
          <body>
          <h2> Dados do solicitante: </h2>
          <h3><b>Nome:</b>${nome}</h3> 
          <h3><b>Email:</b>${email}</h3> 
          <h3><b>Celular:</b>${celular}</h3> 
          <h3><b>Assunto:</b>${assunto}</h3> 
          <h2>Dados da solicitação:</h2>
          <h3>${descricao} <h3>
          </body> 
          `
        }
  
       await transporter.sendMail(message,(err,info)=>{
          if(err){
            res.send('Problemas com o contato, envie um email diretamento para "plazadasfloresdh@gmail.com"')
          }else{
            res.send('Contato enviado com sucesso')
          }
  
      })
      
       
        res.render("index",{titulo:"Plaza das Flores"})
  
      
      }
}
 
module.exports = homePageController