const {Dependente, Usuario} = require('../../models')
const bcrypt = require('bcrypt')
const generateId = require('../../utils/generateId')

module.exports = dependenteController = {
    
    store: async (req, res) => {
        const { user } = req.session;
        const {nomeDependente, emailDependente, cpfDependente, rgDependente  } = req.body;
        const [fotoDependente] = req.files;

        let foto = null   
        if(foto == null){foto = `/images/padrao/padrao.png` } 
        if(fotoDependente){foto = `/images/dependentes/${fotoDependente.filename}` }  
        tokenD = generateId()
        const senhaD = bcrypt.hashSync(cpfDependente, 10)

        try {
            const novoUsuario = await Usuario.create({
                nome: nomeDependente,
                email: emailDependente,
                cpf: cpfDependente,
                rg: rgDependente,
                bloco_id: user.bloco_id,
                apartamento_id: user.apartamento_id,
                senha: senhaD,
                foto: foto,
                tipo_usuario_id: 1,
                status: true,
                token: tokenD,
            })


             const novaDependete =  await Dependente.create({
                 dependente_id: novoUsuario.id,
                 morador_id : user.id,
             })
            return res.status(201).redirect('/backoffice/morador/perfil')
        } catch (error) {
            return res.status(400).json(error);
        }

    },
    delete: async (req, res) => {
        const { dependenteId } = req.params;

        try {
            const deleteDependente= await Dependente.destroy({
                where: [{ id: dependenteId },
                ]
            });

            return res.redirect("/backoffice/morador/perfil");
        } catch (error) {
            return res.status(400).json(error);
        }

    },
    update: async (req, res) => {
        const { user } = req.session;
        const {nomeDependente, emailDependente, cpfDependente, rgDependente  } = req.body;
        const [fotoDependente] = req.files;
        const { dependenteId } = req.params;

        let foto = null   
        if(foto == null){foto = `/images/padrao/padrao.png` } 
        if(fotoDependente){foto = `/images/dependentes/${fotoDependente.filename}` }  
        tokenD = generateId()
        const senhaD = bcrypt.hashSync(cpfDependente, 10)

        try {
            const editarDependente = await Usuario.update({
                nome: nomeDependente,
                email: emailDependente,
                cpf: cpfDependente,
                rg: rgDependente,
                bloco_id: user.bloco_id,
                apartamento_id: user.apartamento_id,
                senha: senhaD,
                foto: foto,
                tipo_usuario_id: 1,
                status: true,
                token: tokenD,
               
            }, {
                where: { id: dependenteId }
            })

            return res.redirect("/backoffice/morador/perfil")
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    



}