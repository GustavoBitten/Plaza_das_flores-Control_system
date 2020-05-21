const {
  Morador
} = require('../../models')

module.exports = moradorController = {
  store: async (req, res) => {
    let {
      nome,
      email,
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
    const senha = cpf
    console.log()
    Morador.create({nome,email,cpf,bloco_id,apartamento_id,senha})

    // const morador = await Morador.create({
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