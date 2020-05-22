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
      sindico,
      status
    } = req.body

    bloco_id = 2
    apartamento_id = 1
    const senha =  bcrypt.hashSync(cpf, 10)
    console.log(senha)
    Usuario.create({nome,email,cpf,bloco_id,apartamento_id,senha})

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
    //res.redirect('/backoffice/sindico/moradores')
  }
}