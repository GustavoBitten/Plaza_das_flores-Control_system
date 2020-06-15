const Sequelize = require('sequelize')
const {
  Cobranca,
  Tipo_cobranca,
  Usuario,
  Bloco,
  Apartamento
} = require('../../models')
const moment = require('moment')
const Op = Sequelize.Op


class Financeiro {

  index = async (req, res) => {

    const {
      error
    } = req.query
    console.log(error)

    const userTypeId = req.session.user.tipo_usuario_id
    const userId = req.session.user.id

    const verifyUser = (userTypeId) => {
      if (userTypeId == 1) {
        return {
          usuario_id: userId
        }
      } else {
        return {
          id: {
            [Op.gt]: 0
          }
        }
      }

    }

    const listaCobrancas = await Cobranca.findAll({
      include: [{
        association: 'tipo_cobranca',
      }, {
        association: 'usuario'
      }],

      where: verifyUser(userTypeId)
    })



    const resultBloco = await Bloco.findAll()
    const resultApartamento = await Apartamento.findAll()
    const resultTipo_cobranca = await Tipo_cobranca.findAll()



    return res.render("backoffice/financeiro", {
      titulo: "Financeiro",
      usuario: req.session.user,
      listaCobrancas,
      moment,
      resultBloco,
      resultApartamento,
      resultTipo_cobranca,
      error

    })
  }

  show = async (req, res) => {

    const {
      id
    } = req.params


    const infoCobranca = await Cobranca.findByPk(id)



    //Esse site é capaz de gerar boletos de acordo com os query params passado, abaixo tem todas as opções
    const baseUrl = 'http://www.sicadi.com.br/mhouse/boleto/boleto3.php?'

    const data = {
      numero_banco: '341-7',
      local_pagamento: 'Pagavel em qualquer banco',
      cedente: 'Plaza das flores - Condominio',
      data_documento: moment(infoCobranca.data).format('DD/MM/YYYY'),
      numero_documento: 'DF 00113',
      especie: 'S',
      aceite: 'N',
      data_processamento: moment(infoCobranca.data).format('DD/MM/YYYY'),
      //uso_banco:'',
      carteira: '179',
      especie_moeda: 'Real',
      quantidade: '',
      valor: '',
      vencimento: moment(infoCobranca.vencimento).format('DD/MM/YYYY'),
      agencia: '0049',
      codigo_cedente: '10201-5',
      meunumero: '00010435',
      valor_documento: infoCobranca.valor,
      instrucoes: infoCobranca.titulo,
      // mensagem1=Linha+1&
      // mensagem2=Linha+2+&
      // mensagem3=Linha+3&
      sacado: req.session.user.nome
      // Submit=Enviar
    }

    let fullUrl = baseUrl
    for (let parameter in data) {
      fullUrl = fullUrl + parameter + '=' + data[parameter] + '&'
    }

    return res.redirect(fullUrl)

  }

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

    if (!usuario) {
      const error = "Usuario para cadastro não encontrado"
      return res.redirect('/backoffice/morador/financeiro?error=' + error)
    }

    const usuario_id = usuario.id

    try {
      await Cobranca.create({
        titulo,
        vencimento,
        tipo_cobranca_id: Number(tipo_cobranca_id),
        valor: Number(valor),
        descricao,
        usuario_id: Number(usuario_id),
        data,
        codigo: "fdgdfg34dfgedgf34gdfer"
      })

    } catch (err) {
      const error = "não foi possível cadastrar essa cobrança"
      return res.redirect('/backoffice/morador/financeiro?error=' + error)
    }




    return res.redirect('/backoffice/morador/financeiro')



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