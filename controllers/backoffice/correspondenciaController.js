const moment = require("moment")
//const truncate = require('html-truncate')
//const { validationResult } = require('express-validator')

const { Correspondencia, Apartamento, Bloco, Usuario, Tipo_correspondencia } = require("../../models")

module.exports = comunicadoController = {
  index: async (req, res) => {
    const { user } = req.session

    try {
      let where = {}

      if (user.tipo_usuario_id == 1)
        where['morador_id'] = user.id

      const listaCorrespondencias = await Correspondencia.findAll({
        where,
        include: [{
          association: 'morador',
          include: [{
            association: 'ap'
          }, {
            association: 'bl'
          }]
        }, {
          association: 'porteiro'
        }, {
          association: 'tipo_correspondencia'
        }, {
          association: 'status'
        }, {
          association: 'retirado'
        }]
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
  store: async (req, res) => {
    const { user } = req.session
    const { bloco_id, apartamento_id, tipo_correspondencia_id, rastreio, morador_id } = req.body

    try {
      if (user.tipo_usuario_id != 1) {
        let correspondencia = await Correspondencia.create({
          bloco_id,
          apartamento_id,
          tipo_correspondencia_id,
          rastreio,
          morador_id,
          porteiro_id: user.id,
          situacao_id: 1
        })

        return res.status(200).json(correspondencia)
      } else {
        throw res.status(400).json({error: 'Erro de permissão!'})
      }
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  },
  getComboValues: async (_req, res) => {
    try {
      const listaApartamentos = await Apartamento.findAll()
      const listaBlocos = await Bloco.findAll()
      const listaTipos = await Tipo_correspondencia.findAll()

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
        }
      })

      if (!morador)
        throw res.status(200).json({error: 'Morador não cadastrado'}) // Apartamento a venda

      return res.status(200).json(morador)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  getCorrespondencias: async (req, res) => {
    const { user } = req.session

    try {
      let where = {}

      if (user.tipo_usuario_id == 1)
        where['morador_id'] = user.id

      const listaCorrespondencias = await Correspondencia.findAll({
        where,
        include: [{
          association: 'morador',
          include: [{
            association: 'ap'
          }, {
            association: 'bl'
          }]
        }, {
          association: 'porteiro'
        }, {
          association: 'tipo_correspondencia'
        }, {
          association: 'status'
        }, {
          association: 'retirado'
        }]
      })

      if (!listaCorrespondencias)
        throw res.status(400).json({error: 'Falha ao carregar os dados!'})

      return res.status(200).json({listaCorrespondencias, user})
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}
