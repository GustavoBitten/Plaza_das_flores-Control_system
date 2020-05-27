const { Veiculo, Usuario } = require('../../models')

module.exports = veiculoController = {
    store: async (req, res) => {
        const { user } = req.session;
        const { modeloVeiculo,placaVeiculo, corVeiculo } = req.body;
        const [fotoVeiculo] = req.files;
        try {
            const novoVeiculo = await Veiculo.create({
                modelo: modeloVeiculo,
                placa: placaVeiculo,
                cor: corVeiculo,
                foto: `/images/veiculos/${fotoVeiculo.filename}`,
                morador_id: user.id
            })
            return res.status(201).redirect('/backoffice/morador/perfil')
        } catch (error) {
            return res.status(400).json(error);
        }

    },
    delete: async (req, res) => {
        const { veiculoId } = req.params;
        
        try{const deleteVeiculo = await Veiculo.destroy({
            where: [{ id: veiculoId },
            ]
        });

        return res.redirect("/backoffice/morador/perfil");
        }catch(error){
            return res.status(400).json(error);
        }
        
    },
    update: async (req, res) => {
        const { user } = req.session;
        const { veiculoId } = req.params
        const [fotoVeiculo] = req.files;
        const { modeloVeiculo,placaVeiculo, corVeiculo } = req.body;
        
        try{
            const editarVeiculo = await Veiculo.update({
                modelo: modeloVeiculo,
                placa: placaVeiculo,
                cor: corVeiculo,
                foto: `/images/veiculos/${fotoVeiculo.filename}`,
                morador_id: user.id ,
            }, {
                where: { id: veiculoId }
            })
    
            return res.redirect("/backoffice/morador/perfil")
        }catch(error){
            return res.status(400).json(error);
        }
    },

}