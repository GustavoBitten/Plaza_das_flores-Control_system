const { Funcionario, Log_funcionario , Usuario } = require('../../models')

module.exports = funcionarioController = {
    store: async (req, res) => {
        const { user } = req.session;
        const { nomeFuncionario, rgFuncionario, cpfFuncionario, tipoFuncionario,empresaFuncionario } = req.body;
        const [fotoFuncionario] = req.files;

        let foto = null   
        if(foto == null){foto = `/images/padrao/padrao.png` } 
        if(fotoFuncionario){foto = `/images/funcionarios/${fotoFuncionario.filename}` }  
        
        try {
            const novoFuncionario = await Funcionario.create({
                nome: nomeFuncionario,
                rg: rgFuncionario,
                cpf: cpfFuncionario,
                empresa: empresaFuncionario,
                tipo: tipoFuncionario,
                status: true,
                foto: foto,
            })

            const log = await Log_funcionario.create({
                morador_id: user.id,
                funcionario_id: novoFuncionario.id,
             })
            return res.status(201).redirect('/backoffice/morador/perfil')
        } catch (error) {
            return res.status(400).json(error);
        }

    },
    delete: async (req, res) => {
        const { funcionarioId } = req.params;
        const { user } = req.session;
        

        try {
            const deleteFuncionario = await Funcionario.destroy({
                where: [{ id: funcionarioId },
                ]
            });
            return res.redirect("/backoffice/morador/perfil");
        } catch (error) {
            return res.status(400).json(error);
        }

    },
    update: async (req, res) => {
        const { user } = req.session;
        const { funcionarioId } = req.params
        const { nomeFuncionario, rgFuncionario, cpfFuncionario, tipoFuncionario,empresaFuncionario } = req.body;
        const [fotoFuncionario] = req.files;

        let foto = null   
        if(foto == null){foto = `/images/padrao/padrao.png` } 
        if(fotoFuncionario){foto = `/images/funcionarios/${fotoFuncionario.filename}` }  

        try {
            const editarFuncionario = await Funcionario.update({
                nome: nomeFuncionario,
                rg: rgFuncionario,
                cpf: cpfFuncionario,
                empresa: empresaFuncionario,
                tipo: tipoFuncionario,
                status: true,
                foto: foto,
                //morador_id: user.id,
            }, {
                where: { id: funcionarioId }
            })

            return res.redirect("/backoffice/morador/perfil")
        } catch (error) {
            return res.status(400).json(error);
        }
    },
}