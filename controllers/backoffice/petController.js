const {Pet, Morador} = require('../../models')

// controller em desenvolvimento

  module.exports = petController = {

     index: async (req, res) => {
        const pets = await Pet.findAll()
    
        console.log(pets);
      },
    store: async (req, res) => {
      // const {user} = req.session;  
      const {nomePet,especiePet,portePet, fotoPet} = req.body;  // morador_id será via session

      // recebendo foto do multer
      //const [fotoPet] = req.files;

        const novoPet = await Pet.create({
        nome: nomePet,
        especie: especiePet,
        porte: portePet,
        foto: fotoPet ,//`/images/${fotoPet.filename}`,
        morador_id: 2, // user.id
      }) 

     //console.log(req.body)
     console.log(fotoPet)
     res.redirect('/backoffice/pets')
      
    },
  }