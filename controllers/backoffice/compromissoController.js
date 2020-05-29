const { Compromisso, Usuario } = require('../../models')


module.exports = compromissoController = {
    store: async (req, res) => {
        const { user } = req.session;
        const { nomeCompromisso, localCompromisso,dataCompromisso } = req.body;
        const [fotoCompromisso] = req.files;
        try {
            const novoCompromisso = await Compromisso.create({
                compromisso: nomeCompromisso,
                local: localCompromisso,
                data: dataCompromisso,
                morador_id: user.id,
                foto: `/images/compromissos/${fotoCompromisso.filename}`
            })
            return res.status(201).redirect('/backoffice/morador/perfil')
        } catch (error) {
            return res.status(400).json(error);
        }

    },
    delete: async (req, res) => {
        const { compromissoId } = req.params;

        try {
            const deleteCompromisso = await Compromisso.destroy({
                where: [{ id: compromissoId },
                ]
            });

            return res.redirect("/backoffice/morador/perfil");
        } catch (error) {
            return res.status(400).json(error);
        }

    },
    update: async (req, res) => {
        const { user } = req.session;
        const { compromissoId } = req.params
        const [fotoCompromisso] = req.files;
        const { nomeCompromisso, localCompromisso,dataCompromisso } = req.body;
        

        try {
            const editarCompromisso = await Compromisso.update({
                compromisso: nomeCompromisso,
                local: localCompromisso,
                data: dataCompromisso,
                morador_id: user.id,
                foto: `/images/compromissos/${fotoCompromisso.filename}`
            }, {
                where: { id: compromissoId }
            })

            return res.redirect("/backoffice/morador/perfil")
        } catch (error) {
            return res.status(400).json(error);
        }
    },

}