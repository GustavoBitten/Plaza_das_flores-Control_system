const {
  Morador
} = require('../../models')

module.exports = moradorController = {
  store: async (req, res) => {
    const {
      nome,
      email,
      cpf,
      rg,
      bloco_id,
      apartamento_id,
      senha,
      foto,
      sindico,
      status
    } = req.body
    console.log(req.body)

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