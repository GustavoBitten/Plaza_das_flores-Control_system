const moment = require("moment")
//const truncate = require('html-truncate')
//const { validationResult } = require('express-validator')

const { Correspondencia } = require("../../models")

module.exports = comunicadoController = {
  index: async (req, res) => {
    try {
      const { user } = req.session

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
  }
}
