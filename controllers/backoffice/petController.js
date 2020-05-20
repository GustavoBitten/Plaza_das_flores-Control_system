const {Pet} = require('../../models')

// controller em desenvolvimento

  module.exports = petController = {
    store: async (req, res) => {
      const {user} = req.session;  
      const {nome,especie,porte} = req.body;
      // recebendo foto do multer
      const [foto] = req.files;

      console.log(req.body)
    }
  }