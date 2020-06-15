const moment = require("moment")
const truncate = require('html-truncate')
const { validationResult } = require('express-validator')

const { Comunicado } = require("../../models")

module.exports = comunicadoController = {
  index: async (req, res) => {
    try {
      const listaComunicados = await Comunicado.findAll({
        attributes: ['id', 'titulo', 'created_at', 'updated_at'],
        order: [
          ['updated_at', 'DESC'],
          ['created_at', 'DESC']]
      })

      return res.render("backoffice/comunicados", {
        titulo: "Comunicados",
        usuario: req.session.user,
        listaComunicados,
        moment,
        truncate
      })
    } catch (error) {
      return res.render("backoffice/comunicados", {
        titulo: "Comunicados",
        usuario: req.session.user,
        listaComunicados,
        moment,
        truncate,
        error
      })
    }
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
    const sindico_id = user.id

    try{
      if (validationResult(req).errors.length > 0)
        throw {errors: validationResult(req).errors.reverse()}

      if (user.tipo_usuario_id != 2)
        throw {errors: [{msg: 'Erro de permissão, apenas síndicos podem criar novos comunicados!'}]}

      const createComunicado = await Comunicado.create({
        sindico_id,
        titulo,
        mensagem,
      });

      if (!createComunicado)
        throw {errors: [{msg: 'Erro ao criar o comunicado, tente novamente mais tarde!'}]}

      return res.status(200).json(createComunicado)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  update: async (req, res) => {
    const { user } = req.session
    const { id } = req.params
    const { titulo, mensagem } = req.body

    try {
      if (validationResult(req).errors.length > 0)
        throw {errors: validationResult(req).errors.reverse()}

      if (user.tipo_usuario_id != 2)
        throw {errors: [{msg: 'Erro de permissão, apenas síndicos podem atualizar comunicados!'}]}

      const comunicado = await Comunicado.findByPk(id)

      if (comunicado.titulo == titulo && comunicado.mensagem == mensagem)
        throw {errors: [{msg: 'Não houve alteração no comunicado!'}]}

      const updateComunicado = await Comunicado.update({
        titulo,
        mensagem,
      }, {
        where: {id}
      });

      if(!updateComunicado)
        throw {errors: [{msg: 'Erro ao atualizar o comunicado, tente novamente mais tarde!'}]}

      return res.status(200).json(updateComunicado)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  destroy: async (req, res) => {
    const { user } = req.session

    try {
      const { id } = req.params

      const comunicado = await Comunicado.findByPk(id)

      if(!comunicado)
        throw {errors: [{msg: 'Comunicado não existe!'}]}

      if (user.tipo_usuario_id != 2)
        throw {errors: [{msg: 'Erro de permissão, apenas síndicos podem excluir comunicados!'}]}

      const destruirComunicado = await Comunicado.destroy({
        where: [{id}]
      })

      if(!destruirComunicado)
        throw {errors: [{msg: 'Erro ao excluir comunicado'}]}

      return res.status(200).json(destruirComunicado)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  getComunicados: async (req, res) => {
    try {
      const listaComunicados = await Comunicado.findAll({
        attributes: ['id', 'titulo', 'created_at', 'updated_at'],
        order: [
          ['updated_at', 'DESC'],
          ['created_at', 'DESC']]
      })

      return res.status(200).json(listaComunicados)
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}
