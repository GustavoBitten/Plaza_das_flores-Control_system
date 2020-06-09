const {
  Usuario,
  Bloco,
  Apartamento
} = require('../../models')
const bcrypt = require('bcrypt')
const generateId = require('../../utils/generateId')
const {
  check,
  validationResult,
  body
} = require("express-validator")


module.exports = moradorController = {
  store: async (req, res) => {

    let listaErrors = validationResult(req)
    console.log(listaErrors)


    if (listaErrors.isEmpty()) {
      let {
        nome,
        email,
        cpf,
        rg,
        bloco_id,
        apartamento_id,
        tipo,
        status
      } = req.body
      console.log(req.body)

      const [fotoMorador] = req.files;

      //if verifica se tem foto se não tiver salva sem foto no banco
      if (fotoMorador == undefined) {
        foto = `/images/padrao/padrao.png`
      } else {

        foto = `/images/moradores/${fotoMorador.filename}`

      }

      token = generateId()
      bloco_id = 2
      apartamento_id = 2
      tipo_usuario_id = 1
      const senha = bcrypt.hashSync(cpf, 10)
      console.log(senha)

      /* const VerificaEmail = await Usuario.findOne({ 
      where:{
         email: email } });
if (project != null) {
  console.log('Not found!');
} else {
  
} */
      try {
        const novoMorador = await Usuario
          .create({
            nome,
            email,
            cpf,
            rg,
            bloco_id,
            token,
            apartamento_id,
            senha,
            foto,
            tipo_usuario_id
          })


        //return res.redirect("/backoffice/sindico/moradores")
        return res.status(201).redirect('./moradores')

      } catch (error) {
        return res.status(400).json(error)

      }
    } else {
      /* 
            console.log(listaErrors.errors)
            return res.redirect("/backoffice/sindico/moradores", {
              errors: listaErrors.errors
            }, 301)
       */

      //let {param,msg} = listaErrors
    }



    res.status(400).send({
      error: listaErrors
    })


  },


  buscaUsuario: async (req, res) => {
    // console.log(req.query)
    let {
      tipoBusca,
      valor
    } = req.query
    //console.log(tipoBusca , valor)
    const Sequelize = require("sequelize")


    const Op = Sequelize.Op; // biblioteca de operadores
    //console.log(Op)
    var query = `%${req.query.valor}%`;
    console.log("query: " + query)

    let result = {
      msg: "Não foi encontrado cadastros no resultado"
    }

    //const buscando = await function()=>{ 
    if (tipoBusca == "nome") {

      result = await Usuario.findAll({
        where: {
          nome: {
            [Op.like]: query
          }
        },
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ['updated_at', 'DESC'],
        ]
      })

      
    } else {
      result = await Usuario.findAll({
        where: {
          cpf: {
            [Op.like]: query
          }
        },
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ['updated_at', 'DESC'],
        ]
      })

     
    }



    const resultBloco = await Bloco.findAll()
    const resultApartamento = await Apartamento.findAll()
    msg = undefined
    // console.log("id que trouxe é: "+ result)

    return res.render('./backoffice/sindico/moradores', {
      titulo: "Síndico - Moradores",
      result,
      resultBloco,
      resultApartamento,
      msg,
      usuario: "FODÂO",
      // quote: "padrão"
    })

  },
  ListaMoradores: async (req, res) => {

    const result = await Usuario.findAll({
      where: {
        tipo_usuario_id: 2
      },
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ['updated_at', 'DESC'],
      ]
    })
    const resultBloco = await Bloco.findAll()
    const resultApartamento = await Apartamento.findAll()
    msg = undefined
    // console.log("id que trouxe é: "+ result)

    return res.render('./backoffice/sindico/moradores', {
      titulo: "Síndico - Moradores",
      result,
      resultBloco,
      resultApartamento,
      msg,
      usuario: "FODÂO",
      // quote: "padrão"
    })

  },
  editar: async (req, res) => {
    const {
      moradorId
    } = req.params
    const {
      nome,
      email,
      cpf,
      rg,
      bloco_id,
      apartamento_id,
      //  tipo,
      //  status
    } = req.body
    const [fotoMorador] = req.files;
    //if verifica se mudou foto caso mudou , salva a nova.
    if (fotoMorador == undefined) {
      // foto = "SEM FOTO"
      const buscaFoto = await Usuario.findOne({
        where: {
          id: moradorId
        }
      })
      foto = buscaFoto.foto

    } else {

      foto = `/images/moradores/${fotoMorador.filename}`
    }


    const result = await Usuario.update({
      nome: nome,
      email: email,
      cpf: cpf,
      rg: rg,
      bloco_id: bloco_id,
      apartamento_id: apartamento_id,
      foto: foto

    }, {
      where: {
        id: moradorId
      }

    })
    console.log("execução da edição : " + result)

    return res.redirect("/backoffice/sindico/moradores")
  },
  desativa: async (req, res) => {
    let {
      id,
      status
    } = req.params
     novostatus = false
 
   
    if(status == "false"){
      novostatus = true
      console.log("if 1")
    }
    const result = await Usuario.update({
      status: novostatus

    }, {
      where: {
        id: id
      }

    })
    return res.redirect("/backoffice/sindico/usuarios")
  },
 reseteSenha: async (req, res) => {
    let {
      id,
      cpf
    } = req.params
    const senha = bcrypt.hashSync(cpf, 10)

   console.log("cpf:" +  cpf + "  Senha nova: " + senha)
    const result = await Usuario.update({
      senha: senha

    }, {
      where: {
        id: id
      }

    })

    console.log(result)
    return res.redirect("/backoffice/sindico/usuarios")
  },


  //Validações

  existeEmail: async (email) => {
    //função para validar se email existe
    const buscaEmail = await Usuario.findOne({
      where: {
        email: email
      }
    })
    resultBusca = buscaEmail
    if (resultBusca) {
      return Promise.reject("Email ja utilizado")
    }
  },
  existeCPF: async (cpf) => {
    //função para validar se email existe
    const buscaCPF = await Usuario.findOne({
      where: {
        cpf: cpf
      }
    })
    resultBusca = buscaCPF
    if (resultBusca) {
      return Promise.reject("CPF ja utilizado")
    }
  }
}