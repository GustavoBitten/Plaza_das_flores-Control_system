const {
  Apartamento
} = require('../../models')

module.exports = apartamentoController = {
  store: async (req, res) => {
    const {
      apartamento
    } = req.body

    const createApartamento = await Apartamento.create({
      apartamento
    })

    return res.json(createApartamento)
  }
}