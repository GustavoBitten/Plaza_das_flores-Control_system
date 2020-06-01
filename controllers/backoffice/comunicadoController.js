const moment = require("moment")
const truncate = require('html-truncate')
const { validationResult } = require('express-validator')

const { Comunicado } = require("../../models")

module.exports = comunicadoController = {
  index: async (req, res) => {
    const listaComunicados = await Comunicado.findAll()

    return res.render("backoffice/comunicados", {
      titulo: "Comunicados",
      usuario: req.session.user,
      listaComunicados,
      moment,
      truncate
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
    const { user } = req.session
    const { titulo, mensagem } = req.body

    // const sindico_id = user.id
    const sindico_id = 2

    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw res.status(422).json({ errors: errors.array() });
      }

      // if (user.tipo == 'sindico') {
      const createComunicado = await Comunicado.create({
        sindico_id,
        titulo,
        mensagem,
      });
      // }

      if (!createComunicado)
        throw res.status(400).json({error: 'Erro ao criar o comunicado, tente novamente mais tarde!'})

      return res.status(200).json(createComunicado)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  update: async (req, res) => {
    const { user } = req.session
    const { id } = req.params
    const { titulo, mensagem } = req.body

    // const sindico_id = user.id

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw res.status(422).json({ errors: errors.array() });
      }

      // if (user.tipo == 'sindico') {
      const updateComunicado = await Comunicado.update({
        titulo,
        mensagem,
      }, {
        where: {id}
      });
      // }

      if(!updateComunicado)
        throw res.status(400).json({error: 'Erro ao atualizar o comunicado, tente novamente mais tarde!'})

      return res.status(200).json(updateComunicado)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params

      const comunicado = await Comunicado.findByPk(id)

      if(!comunicado)
        throw {error: 'Comunicado não existe!'}

      const destruirComunicado = await Comunicado.destroy({
        where: [{id}]
      })

      if(!destruirComunicado)
        throw {error: 'Erro ao excluir comunicado'}

      return res.status(200).json(destruirComunicado)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  getComunicados: async (req, res) => {
    try {
      const listaComunicados = await Comunicado.findAll()

      listaComunicados.map(comunicado => {
        if (String(comunicado.created_at) == String(comunicado.updated_at)){
          comunicado.created_at = moment(comunicado.created_at).format('DD/MM/YYYY')
          comunicado.updated_at = '-'
        } else {
          comunicado.created_at = moment(comunicado.created_at).format('DD/MM/YYYY')
          comunicado.updated_at = moment(comunicado.updated_at).format('DD/MM/YYYY')
        }

        return comunicado
      })

      return res.status(200).json(listaComunicados)
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}
