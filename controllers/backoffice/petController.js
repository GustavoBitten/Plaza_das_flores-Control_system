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
      if(!novoPet){return res.render("/backoffice/morador/perfil", { msg: "Falha ao cadastrar o Novo Pet" })};
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

     viewUpdate: async (req, res) => {
      const {petId} = req.params;

       const recebendoPet = await Pet.findOne({
         where: {
           id: petId
         }
       })
  
      console.log(recebendoPet)
    },




  }