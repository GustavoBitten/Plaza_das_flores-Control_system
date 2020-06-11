const {
  Cobranca,
  Tipo_cobranca,
  Usuario,
  Bloco,
  Apartamento
} = require('../../models')
const moment = require('moment')


class Financeiro {

  index = async (req, res) => {



    const listaCobrancas = await Cobranca.findAll({
      include: [{
        association: 'tipo_cobranca', //Tipo_cobranca
      }, {
        association: 'usuario' //Tipo_cobranca
      }]
    })

    const resultBloco = await Bloco.findAll()
    const resultApartamento = await Apartamento.findAll()
    const resultTipo_cobranca = await Tipo_cobranca.findAll()



    res.render("backoffice/morador/financeiro", {
      titulo: "Morador - Financeiro",
      usuario: req.session.user,
      listaCobrancas,
      moment,
      resultBloco,
      resultApartamento,
      resultTipo_cobranca

    })
  }

  show = (req, res) => {}
  create = async (req, res) => {
    const {
      titulo,
      vencimento,
      data,
      tipo_cobranca_id,
      valor,
      bloco_id,
      apartamento_id,
      descricao
    } = req.body

    const usuario = await Usuario.findOne({
      where: {
        bloco_id,
        apartamento_id
      }
    })

    const usuario_id = usuario.id
        
    const sucessCreate = await Cobranca.create({
      titulo,
      vencimento,
      tipo_cobranca_id: Number(tipo_cobranca_id),
      valor: Number(valor),
      descricao,
      usuario_id: Number(usuario_id),
      data,
      codigo: "fdgdfg34dfgedgf34gdfer"
    })

    res.send(sucessCreate)
  }


  update = (req, res) => {}
  destroy = async (req, res) => {

    const id = req.params.id

    await Cobranca.destroy({
      where: {
        id
      }

    })


    res.redirect('/backoffice/morador/financeiro')
  }

}

module.exports = new Financeiro