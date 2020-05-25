const moment = require("moment");
const { Comunicado } = require("../../models");

module.exports = comunicadoController = {
  index: async (req, res) => {
    const listaComunicados = await Comunicado.findAll()

    return res.render("backoffice/sindico/comunicados", {
      titulo: "Comunicados",
      usuario: req.session.user,
      listaComunicados,
      moment,
    })
  },
  store: async (req, res) => {
    let msg = ''
    const { user } = req.session
    const { titulo, mensagem } = req.body
    
    // const morador_id = user.id
    const morador_id = 9
    
    const createComunicado = await Comunicado.create({
      morador_id,
      titulo,
      mensagem,
    });

    if (createComunicado)
      msg = 'Comunicado criado com sucesso!'
    else
      msg = 'Erro ao criar o comunicado!'

    return res.redirect("comunicados")
  },
};
