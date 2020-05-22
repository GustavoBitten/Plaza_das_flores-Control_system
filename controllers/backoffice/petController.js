const {Pet, Usuario} = require('../../models')

  module.exports = petController = {
    store: async (req, res) => {
      //const {user} = req.session;  
      const {nomePet,especiePet,portePet} = req.body;  
      const [fotoPet] = req.files;

      const novoPet = await Pet.create({
        nome: nomePet,
        especie: especiePet,
        porte: portePet,
        foto: `/images/${fotoPet.filename}`,
        morador_id: 7 // user.id,
     }) 
      if(!novoPet){return res.render("/backoffice/morador/perfil", { msg: "Falha ao cadastrar o Novo Pet" })};
      return res.redirect('/backoffice/morador/perfil')

    },
  }