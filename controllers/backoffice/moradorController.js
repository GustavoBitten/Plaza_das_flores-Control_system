const {
  Usuario
} = require('../../models')
const bcrypt = require('bcrypt')
module.exports = moradorController = {
  store: async (req, res) => {
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
    const [fotoMorador] = req.files;

    //if verifica se tem foto se não tiver salva sem foto no banco
    if (fotoMorador == undefined) {
      foto = "SEM FOTO"
    } else {

      foto = `/images/moradores/${fotoMorador.filename}`

    }
    bloco_id = 2
    apartamento_id = 1
    tipo_usuario_id = 2
    const senha = bcrypt.hashSync(cpf, 2)
    console.log(senha)
    const novoMorador = await Usuario.create({
      nome,
      email,
      cpf,
      rg,
      bloco_id,
      apartamento_id,
      senha,
      foto,
      tipo_usuario_id
    })


    return res.redirect("/backoffice/sindico/moradores")
    // const morador = await Usuario.create({
    //   nome,
    //   email,
    //   cpf,
    //   rg,
    //   bloco_id,
    //   apartamento_id,
    //   senha,
    //   foto,
    //   sindico,
    //   status
    // })

    //return res.json(morador)

  },
  ListaMoradores: async (req, res) => {

    const result = await Usuario.findAll({
      where: {
        tipo_usuario_id: 2
      }
    })


    return res.render('./backoffice/sindico/moradores', {
      titulo: "Síndico - Moradores",
      result,
      usuario: "FODÂO"
    })

  },
}