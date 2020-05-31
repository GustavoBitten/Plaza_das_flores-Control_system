const { Pet, Usuario } = require('../../models')

module.exports = petController = {
  store: async (req, res) => {
    const { user } = req.session;
    const { nomePet, especiePet, portePet } = req.body;
    const [fotoPet] = req.files;

    let foto = null   
    if(foto == null){foto = `/images/padrao/padrao.png` } 
    if(fotoPet){foto = `/images/pets/${fotoPet.filename}` }  

    try {
      const novoPet = await Pet.create({
        nome: nomePet,
        especie: especiePet,
        porte: portePet,
        foto: foto ,
        morador_id: user.id,
      })
      return res.status(201).redirect('/backoffice/morador/perfil')
    } catch (error) {
      return res.status(400).json(error);
    }

  },
  delete: async (req, res) => {
    const { petId } = req.params;

    try{
      const deletePet = await Pet.destroy({
        where: [{ id: petId }
        ]
      });
      if(!deletePet)
        throw {error: 'Erro ao excluir comunicado'}
  
      return res.redirect("/backoffice/morador/perfil");

    }catch(error){
      return res.status(400).json(error);
    }
  },
  update: async (req, res) => {
    const { user } = req.session;
    const { petId } = req.params
    const [fotoPet] = req.files;
    const { nomePet, especiePet, portePet } = req.body;

    let foto = null   
    if(foto == null){foto = `/images/padrao/padrao.png` } 
    if(fotoPet){foto = `/images/pets/${fotoPet.filename}` }  

    try{
      const editarPet = await Pet.update({
        nome: nomePet,
        especie: especiePet,
        porte: portePet,
        foto: foto,
        morador_id: user.id,
      }, {
        where: { id: petId }
      })
  
      return res.redirect("/backoffice/morador/perfil")

    }
    catch(error){
      return res.status(400).json(error);
    }
  },

}