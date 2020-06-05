const { Visitante, Visita, Usuario } = require('../../models')

module.exports = visitanteController = {
    store: async (req, res) => {
        const { user } = req.session;
        const { nome, rg, cpf, tipo } = req.body;
        const [fotoVisitante] = req.files;
        let foto = null   
        if(foto == null){foto = `/images/padrao/padrao.png` } 
        if(fotoVisitante){foto = `/images/visitantes/${fotoVisitante.filename}` }  

        try {
            const novoVisitante = await Visitante.create({
                nome: nomeVisitante,
                rg: rgVisitante,
                cpf: cpfVistiante,
                foto: foto,
            })

            const novaVisita =  await Visita.create({
                morador_id = user.id,
                visitante_id = novoVisitante.id
            })
            return res.status(201).redirect('/backoffice/morador/perfil')
        } catch (error) {
            return res.status(400).json(error);
        }

    },
    delete: async (req, res) => {
        const { visitanteId } = req.params;

        try {
            const deleteVisitante = await Visitante.destroy({
                where: [{ id: visitanteId },
                ]
            });

            return res.redirect("/backoffice/morador/perfil");
        } catch (error) {
            return res.status(400).json(error);
        }

    },
    update: async (req, res) => {
        const { user } = req.session;
        const { visitanteId } = req.params
        const [fotoVisitante] = req.files;
        const { nome, rg, cpf, tipo } = req.body;
        let foto = null   
        if(foto == null){foto = `/images/padrao/padrao.png` } 
        if(fotoVisitante){foto = `/images/visitantes/${fotoVisitante.filename}` } 

        try {
            const editarVisitante = await Visitante.update({
                nome: nomeVisitante,
                rg: rgVisitante,
                cpf: cpfVistiante,
                foto: foto,
            }, {
                where: { id: visitanteId }
            })

            return res.redirect("/backoffice/morador/perfil")
        } catch (error) {
            return res.status(400).json(error);
        }
    },

}