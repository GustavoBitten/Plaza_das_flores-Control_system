const {
  Bloco
} = require('../../models')

module.exports = blocoController = {
  index: async (req, res) => {
    const blocos = await Bloco.findAll()

    return res.json(blocos)
  },
  store: async (req, res) => {
    const {
      bloco
    } = req.body

    const createBloco = await Bloco.create({
      bloco
    })

    return res.json(createBloco)
  }
}