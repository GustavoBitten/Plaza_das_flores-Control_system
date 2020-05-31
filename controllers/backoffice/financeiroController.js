//const { Empresa , Usuario } = require('../../models')
const moment = require('moment')


const listaComunicados = [
    {
      id: 5,
      sindico_id: 2,
      titulo: 'Reforma da Piscina',
      mensagem: 'A piscina vai estar interditada para realizarmos a reforma durante os dias 15 e 22',
      created_at: '2020-05-29T19:38:45.600Z',
      updated_at: '2020-05-29T19:38:45.600Z'
    },
    {
      id: 6,
      sindico_id: 2,
      titulo: 'Teste',
      mensagem: 'tessss',
      created_at: '2020-05-29T19:38:45.600Z',
      updated_at: '2020-05-29T19:42:36.613Z'
    }
  ]

class Financeiro {

    index = (req, res) => {
        res.render("backoffice/morador/financeiro", {
          titulo: "Morador - Financeiro",
          usuario: req.session.user,
          listaComunicados,
          moment
        })
      }

}

module.exports = new Financeiro


