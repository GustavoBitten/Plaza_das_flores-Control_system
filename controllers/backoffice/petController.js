const {Pet, Usuario} = require('../../models')

  module.exports = petController = {
    store: async (req, res) => {
      const {user} = req.session;  
      const {nomePet,especiePet,portePet} = req.body;  
      const [fotoPet] = req.files;

      const novoPet = await Pet.create({
        nome: nomePet,
        especie: especiePet,
        porte: portePet,
        foto: `/images/pets/${fotoPet.filename}`,
        morador_id: user.id,
     }) 
      //if(!novoPet){return res.render("/backoffice/morador/perfil", { msg: "Falha ao cadastrar o Novo Pet" })};
      return res.redirect('/backoffice/morador/perfil')

    },
    delete: async (req, res) => {
      const {petId} = req.params;
  
      const deletePet = await Pet.destroy({
        where: [{id:petId},
        ]
      });
  
      return res.redirect("/backoffice/morador/perfil");
    },

    viewUpdate: async (req, res) => {
      const {petId} = req.params;

       const recebendoPet = await Pet.findByPk(petId)
  
      
    },
    
     update: async (req, res) => {
       const { user } = req.session;
       const {petId} = req.params;
       const {nomePet,especiePet,portePet} = req.body;  
       const [fotoPet] = req.files;

       const updatePet = await Pet.update({
          nome: nomePet,
          especie: especiePet,
          porte: portePet,
          foto: `/images/pets/${fotoPet.filename}`,
          morador_id: user.id,
         },{
           where:{id: petId}
         });
   
      return res.redirect("/backoffice/morador/perfil");
      // res.render("backoffice/morador/perfil", {updatePet})
     },







     editar: async (req, res) => {
      const {PetId} = req.params
      const {nomePet,especiePet,portePet} = req.body;  
      const [fotoPet] = req.files;
      
      if (fotoMorador == undefined) {
        // foto = "SEM FOTO"
        const buscaFoto = await Usuario.findOne({
          where: {id: petId}
        })
        foto = buscaFoto.foto
        } else {foto = `/images/moradores/${fotoMorador.filename}`}
  
  
      const result = await Usuario.update({
        nome: nomePet,
        especie: especiePet,
        porte: portePet,
        foto: foto,
        morador_id: user.id,
      },{
        where: {id: petId}
      })
      console.log("execução da edição : " + result)
  
      return res.redirect("/backoffice/morador/perfil")
    },

  }