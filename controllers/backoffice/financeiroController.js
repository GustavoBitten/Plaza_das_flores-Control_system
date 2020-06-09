const {Cobranca, Tipo_cobranca, Usuario } = require('../../models')
const moment = require('moment')


class Financeiro {

    index = async (req, res) => {

       
        
         const listaCobrancas = await Cobranca.findAll(
           {include: [{
            association: 'tipo_cobranca',       //Tipo_cobranca
            }
            
            
            // ,
            // {
            //   model: Tipo_cobranca,
            //   as: 'tipo_cobranca'          //Tipo_cobranca
            // }
          ]})
          
        

      console.log(listaCobrancas[0])
      const Usuario2 = listaCobrancas[0].Usuario
      console.log(Usuario2)

      res.render("backoffice/morador/financeiro", {
      titulo: "Morador - Financeiro",
      usuario: req.session.user,
      listaCobrancas,
      moment
      })
    }

    show = (req, res) => {}
    create = (req, res) => {}
    update = (req, res) => {}
    destroy = async (req, res) => {

     const id = req.params.id

       await Cobranca.destroy({
        where:{
          id
        }
        
      })


      res.redirect('/backoffice/morador/financeiro')
    }

}

module.exports = new Financeiro


