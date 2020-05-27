const { Empresa , Usuario } = require('../../models')

module.exports = empresaController = {
    store: async (req, res) => {
        const { user } = req.session;
        const { nomeEmpresa, rgEmpresa, cnpjEmpresa} = req.body;
        const [fotoEmpresa] = req.files;
        try {
            const novaEmpresa = await Empresa.create({
                nome: nomeEmpresa,
                rg: rgEmpresa,
                cnpj: cnpjEmpresa,
                morador_id: user.id,
                foto: `/images/empresas/${fotoEmpresa.filename}`
            })
            return res.status(201).redirect('/backoffice/morador/perfil')
        } catch (error) {
            return res.status(400).json(error);
        }

    },
    delete: async (req, res) => {
        const { empresaId } = req.params;

        try {
            const deleteEmpresa = await Empresa.destroy({
                where: [{ id: empresaId },
                ]
            });

            return res.redirect("/backoffice/morador/perfil");
        } catch (error) {
            return res.status(400).json(error);
        }

    },
    update: async (req, res) => {
        const { empresaId } = req.params
        const { user } = req.session;
        const { nomeEmpresa, rgEmpresa, cnpjEmpresa} = req.body;
        const [fotoEmpresa] = req.files;
    

        try {
            const editarEmpresa = await Empresa.update({
                nome: nomeEmpresa,
                rg: rgEmpresa,
                cnpj: cnpjEmpresa,
                morador_id: user.id,
                foto: `/images/empresas/${fotoEmpresa.filename}`
            }, {
                where: { id: empresaId }
            })

            return res.redirect("/backoffice/morador/perfil")
        } catch (error) {
            return res.status(400).json(error);
        }
    },

}