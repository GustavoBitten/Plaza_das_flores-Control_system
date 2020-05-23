const {Usuario} = require('../../models')
const bcrypt = require('bcrypt')
module.exports = moradorController = {
  store: async (req, res) => {
    let {   nome,      email,
      cpf,
      rg,
      bloco_id,
      apartamento_id,
      foto,
      tipo,
      status
    } = req.body

    bloco_id = 2
    apartamento_id = 1
    tipo_usuario_id = 1
    const senha =  bcrypt.hashSync(cpf, 2)
    console.log(senha)
    Usuario.create({nome,email,cpf,bloco_id,apartamento_id,senha,tipo_usuario_id})

    // const morador = await Usuario.create({
    //   nome,
    //   email,
    //   cpf,
    //   rg,
    //   bloco_id,
    //   apartamento_id,
    //   senha,
    //   foto,
    //   sindico,
    //   status
    // })

    //return res.json(morador)
    
  },
  ListaMoradores: async (req, res)=>{
    
     const result = await Usuario.findAll()
         
    
     return res.render('./backoffice/sindico/moradores',{titulo:"Síndico - Moradores", result,usuario:"FODÂO"})

 },
}