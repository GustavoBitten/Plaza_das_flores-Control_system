const moment = require("moment");
const { Comunicado } = require("../../models");

module.exports = comunicadoController = {
  index: async (req, res) => {
    const listaComunicados = await Comunicado.findAll()

    return res.render("backoffice/comunicados", {
      titulo: "Comunicados",
      usuario: req.session.user,
      listaComunicados,
      moment,
    })
  },
  show: async (req, res) => {
    try {
      const { id } = req.params

      const comunicado = await Comunicado.findByPk(id)

      if(!comunicado)
        throw {erro: 'Comunicado não existe!'}

      return res.status(200).json(comunicado)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  store: async (req, res) => {
    let msg = ''
    const { user } = req.session
    const { titulo, mensagem } = req.body

    // const sindico_id = user.id
    const sindico_id = 2
    
    // if (user.tipo == 'sindico') {
    const createComunicado = await Comunicado.create({
      sindico_id,
      titulo,
      mensagem,
    });
    // }

    if (createComunicado)
      msg = 'Comunicado criado com sucesso!'
    else
      msg = 'Erro ao criar o comunicado!'

    return res.redirect("comunicados")
  },
};
