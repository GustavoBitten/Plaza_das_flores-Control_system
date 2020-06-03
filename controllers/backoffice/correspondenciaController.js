const moment = require("moment")
//const truncate = require('html-truncate')
//const { validationResult } = require('express-validator')

const { Correspondencia } = require("../../models")

module.exports = comunicadoController = {
  index: async (req, res) => {
    const listaCorrespondencias = await Correspondencia.findAll({
      include: [{
        association: 'morador'
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
      usuario: req.session.user,
      listaCorrespondencias,
      moment
    })
  }
}
