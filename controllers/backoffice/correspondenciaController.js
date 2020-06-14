const moment = require("moment")
const { validationResult } = require('express-validator')

const { Correspondencia, Apartamento, Bloco, Usuario, Tipo_correspondencia } = require("../../models")

module.exports = comunicadoController = {
  index: async (req, res) => {
    const { user } = req.session

    try {
      let where = {}

      if (user.tipo_usuario_id != 3)
        where['morador_id'] = user.id

      const listaCorrespondencias = await Correspondencia.findAll({
        where,
        include: [{
          association: 'morador',
          include: [{
            association: 'ap',
            attributes: ['id', 'apartamento']
          }, {
            association: 'bl',
            attributes: ['id', 'bloco']
          }],
          attributes: ['id', 'nome']
        }, {
          association: 'porteiro',
          attributes: ['id', 'nome']
        }, {
          association: 'tipo_correspondencia',
          attributes: ['id', 'tipo']
        }, {
          association: 'status',
          attributes: ['id', 'situacao']
        }, {
          association: 'retirado',
          attributes: ['id', 'nome']
        }],
        attributes: {
          exclude: ['updated_at']
        },
        order: [
          ['data_retirada', 'DESC'],
          ['created_at', 'DESC']]
      })

      return res.render("backoffice/correspondencias", {
        titulo: "Correspondências",
        usuario: user,
        listaCorrespondencias,
        moment
      })
    } catch (error) {
      return res.status(400).render("backoffice/correspondencias", {
        titulo: "Correspondências",
        usuario: user,
        error
      })
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params

      const correspondencia = await Correspondencia.findByPk(id, {
        include: [{
          association: 'morador',
          include: [{
            association: 'ap',
            attributes: ['id', 'apartamento']
          }, {
            association: 'bl',
            attributes: ['id', 'bloco']
          }],
          attributes: ['id', 'nome']
        }, {
          association: 'porteiro',
          attributes: ['id', 'nome']
        }, {
          association: 'tipo_correspondencia',
          attributes: ['id', 'tipo']
        }, {
          association: 'status',
          attributes: ['id', 'situacao']
        }, {
          association: 'retirado',
          attributes: ['id', 'nome']
        }],
        attributes: {exclude: ['updated_at']}
      })

      if (!correspondencia)
        throw {errors: [{msg: 'Correspondência não encontrada, caso o erro persistir contatar o administrador do sistema!'}]}

      return res.status(200).json(correspondencia)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  store: async (req, res) => {
    const { user } = req.session
    const { bloco_id, apartamento_id, tipo_correspondencia_id, rastreio, morador_id } = req.body

    try {
      if (validationResult(req).errors.length > 0)
        throw {errors: validationResult(req).errors.reverse()}

      if (user.tipo_usuario_id == 3) {
        let correspondencia = await Correspondencia.create({
          bloco_id,
          apartamento_id,
          tipo_correspondencia_id,
          rastreio,
          morador_id,
          porteiro_id: user.id,
          situacao_id: 1
        })

        if (!correspondencia)
          throw {errors: [{msg: 'Não foi possível cadastrar a correspondência, tente novamente mais tarde!'}]}

        return res.status(200).json({msg: 'Correspondência cadastrada com sucesso!'})
      } else {
        console.log('teste')
        throw {errors: [{msg: 'Erro de permissão, apenas a portaria pode cadastrar novas correspondências!'}]}
      }
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  destroy: async (req, res) => {
    const { user } = req.session

    try {
      const { id } = req.params

      const correspondencia = await Correspondencia.findByPk(id)

      if(!correspondencia)
        throw {errors: [{msg: `Correspondência com id '${id}' não existe!`}]}

      if (user.tipo_usuario_id == 1)
        throw {errors: [{msg: 'Erro de permissão, apenas a portaria pode excluir correspondências!'}]}

      const destruirCorrespondencia = await Correspondencia.destroy({
        where: [{id}]
      })

      if(!destruirCorrespondencia)
        throw {errors: [{msg: 'Erro ao excluir a correspondência!'}]}

      return res.status(200).json(destruirCorrespondencia)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  getComboValues: async (_req, res) => {
    try {
      const listaApartamentos = await Apartamento.findAll({
        attributes: ['id', 'apartamento']
      })
      const listaBlocos = await Bloco.findAll({
        attributes: ['id', 'bloco']
      })
      const listaTipos = await Tipo_correspondencia.findAll({
        attributes: ['id', 'tipo']
      })

      if (!listaApartamentos || !listaBlocos || !listaTipos)
        throw {errors: [{msg: 'Erro ao buscar dados, tente novamente mais tarde!'}]}

      return res.status(200).json({listaApartamentos, listaBlocos, listaTipos})
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  getMoradorCombo: async (req, res) => {
    try {
      const { bloco_id, apartamento_id } = req.body

      const morador = await Usuario.findOne({
        where: {
          bloco_id,
          apartamento_id,
          status: true
        },
        attributes: ['id', 'nome']
      })

      if (!morador)
        return res.status(200).json({error: 'Morador não cadastrado'}) // Apartamento a venda

      return res.status(200).json(morador)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  getCorrespondencias: async (req, res) => {
    const { user } = req.session

    try {
      let where = {}

      if (user.tipo_usuario_id != 3)
        where['morador_id'] = user.id

      const listaCorrespondencias = await Correspondencia.findAll({
        where,
        include: [{
          association: 'morador',
          include: [{
            association: 'ap',
            attributes: ['id', 'apartamento']
          }, {
            association: 'bl',
            attributes: ['id', 'bloco']
          }],
          attributes: ['id', 'nome']
        }, {
          association: 'porteiro',
          attributes: ['id', 'nome']
        }, {
          association: 'tipo_correspondencia',
          attributes: ['id', 'tipo']
        }, {
          association: 'status',
          attributes: ['id', 'situacao']
        }, {
          association: 'retirado',
          attributes: ['id', 'nome']
        }],
        attributes: {
          exclude: ['updated_at']
        },
        order: [['data_retirada', 'DESC'], ['created_at', 'DESC']]
      })

      if (!listaCorrespondencias)
        throw {errors: [{msg: 'Falha ao carregar os dados!'}]}

      return res.status(200).json({listaCorrespondencias, user})
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  getMoradorDependentes: async (req, res) => {
    try {
      const { idCorrespondencia } = req.body

      const correspondencia = await Correspondencia.findByPk(idCorrespondencia, {
        include: [{
          association: 'morador',
          attributes: ['bloco_id', 'apartamento_id']
        }],
        attributes: ['id']
      })

      if (!correspondencia)
        throw {errors: [{msg: 'Correspondência não encontrada!'}]}

      const moradores = await Usuario.findAll({
        where: {
          bloco_id: correspondencia.morador.bloco_id,
          apartamento_id: correspondencia.morador.apartamento_id
        },
        attributes: ['id', 'nome']
      })

      if(!moradores)
        throw {errors: [{msg: 'Nenhum morador encontrado'}]}

      return res.status(200).json(moradores)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  registrarRetirada: async (req, res) => {
    try {
      const { idCorrespondencia, idMorador } = req.body

      const updateCorrespondencia = await Correspondencia.update({
        retirado_por: idMorador,
        situacao_id: 4,
        data_retirada: new Date()
      }, {
        where: {
          id: idCorrespondencia
        }
      })

      if (!updateCorrespondencia)
        throw {errors: [{msg: 'Erro ao registrar a retirada, tente novamente!'}]}

      return res.status(200).json(updateCorrespondencia)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  getCount: async (req, res) => {
    const { user } = req.session

    try {
      let where = {}

      if (user.tipo_usuario_id != 3)
        where['morador_id'] = user.id

      const qtdCorrespondencias = await Correspondencia.count({
        where
      })

      if (qtdCorrespondencias == undefined)
        throw {errors: [{msg: 'Falha ao carregar os dados!'}]}

      return res.status(200).json({qtdCorrespondencias})
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}
