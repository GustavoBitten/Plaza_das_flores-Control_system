const {Pet, Usuario} = require('../../models')

  module.exports = petController = {

    listaPet: async (req, res) => {
      const pets = await Pet.findAll({order: [['created_at', 'DESC']]})
      res.render("backoffice/morador/perfil", {titulo:"Morador - Perfil",usuario:req.session.user, pets})
       },

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
     editar: async (req, res) => {
      const { user } = req.session;
      const {petId} = req.params
      console.log(petId)
      const [fotoPet] = req.files;
      const {nomePet,especiePet,portePet} = req.body;  
      console.log(nomePet)
     
  
    
      const result = await Pet.update({
        nome: nomePet,
        especie: especiePet,
        porte: portePet,
        foto: `/images/pets/${fotoPet.filename}`,
        morador_id: user.id,
      },{
        where: {id: petId}
      })
      
  
      return res.redirect("/backoffice/morador/perfil")
    },

  }