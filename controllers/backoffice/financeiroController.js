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

    const {
      error
    } = req.query
    console.log(error)

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



    res.render("backoffice/financeiro", {
      titulo: "Morador - Financeiro",
      usuario: req.session.user,
      listaCobrancas,
      moment,
      resultBloco,
      resultApartamento,
      resultTipo_cobranca,
      error

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
      
    if(!usuario){
      const error = "Usuario para cadastro não encontrado"
      return res.redirect('/backoffice/morador/financeiro?error=' + error)
    }

    const usuario_id = usuario.id

    try{
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
    
  }catch(err){
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