const {
  Usuario
} = require('../../models')
const bcrypt = require('bcrypt')
const generateId = require('../../utils/generateId')
const {
  check,
  validationResult,
  body
} = require("express-validator")


module.exports = porteiroCadController = {
  store: async (req, res) => {

    
    let listaErrors = validationResult(req)
    console.log("lista de erros" +listaErrors)


    if (listaErrors.isEmpty()) {
      let {
        nome,
        rg,
        cpf,
        email,
        tipo,
        status,
        celular
      } = req.body
      console.log(req.body)

      const [fotoPorteiro] = req.files;
      console.log("foto :" + fotoPorteiro)

      //if verifica se tem foto se não tiver salva sem foto no banco
      if (fotoPorteiro == undefined) {
        foto = `/images/padrao/padrao.png`
      } else {

        foto = `/images/porteiros/${fotoPorteiro.filename}`

      }

      token = generateId()
    
      tipo_usuario_id = 3
      const senha = bcrypt.hashSync(cpf, 10)
      console.log("senha: "+senha)

         try {
        const novoPorteiro = await Usuario.create({
            nome,
            email,
            cpf,
            rg,
            token,
            senha,
            foto,
            tipo_usuario_id
          })


        //return res.redirect("/backoffice/sindico/moradores")
        return res.status(201).redirect('./usuarios')

      } catch (error) {
        return res.status(400).json(error)

      }
    } else {
        }

    res.status(400).send({
      error: "deu ruim " + listaErrors
    })


  },
  editar: async (req, res) => {
    const {
      porteiroId
    } = req.params
    const {
      nome,
      email,
      cpf,
      rg,
      //  tipo,
      //  status
    } = req.body
    const [fotoPorteiro] = req.files;
    //if verifica se mudou foto caso mudou , salva a nova.
    if (fotoPorteiro == undefined) {
      // foto = "SEM FOTO"
      const buscaFoto = await Usuario.findOne({
        where: {
          id: porteiroId
        }
      })
      foto = buscaFoto.foto

    } else {

      foto = `/images/porteiros/${fotoMorador.filename}`
    }


    const result = await Usuario.update({
      nome: nome,
      email: email,
      cpf: cpf,
      rg: rg,
      foto: foto

    }, {
      where: {
        id: porteiroId
      }

    })
    console.log("execução da edição : " + result)

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