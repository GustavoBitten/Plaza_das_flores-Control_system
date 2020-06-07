const {Usuario} = require('../../models')
const bcrypt = require('bcrypt')
const generateId = require('../../utils/generateId')

module.exports = perfileController = {
    update: async (req, res) => {
        const { user } = req.session;
        const { senhaAtual, novaSenha  } = req.body;
        const [fotoPerfil] = req.files;
        const { perfilId } = req.params;

        let foto = null   
        if(foto == null){foto = `/images/padrao/padrao.png` } 
        if(fotoPerfil){foto = `/images/moradores/${fotoPerfil.filename}` }  
   
          
       const novaSenhaUsuario = bcrypt.hashSync(novaSenha, 10)
       const senhaUsuario = await Usuario.findByPk(user.id)

        console.log(senhaAtual)
        console.log(senhaUsuario.senha)


        if (bcrypt.compareSync(senhaAtual, senhaUsuario.senha)){

        try {
            const editarSenha= await Usuario.update({
                senha: novaSenhaUsuario      
            }, {
                where: { id: perfilId }
            })

            return res.redirect("/backoffice/morador/perfil")
        } catch (error) {
            return res.status(400).json(error);
        }
       }else return res.status(400).json({msg: 'Senha errada'});
    },

    updateFoto: async (req, res) => {
        const { user } = req.session;
        const { senhaAtual, novaSenha  } = req.body;
       // nomePerfil, emailPerfil, cpfPerfil, rgPerfil, novaSenha,
        const [fotoPerfil] = req.files;
        const { perfilId } = req.params;

        let foto = null   
        if(foto == null){foto = `/images/padrao/padrao.png` } 
        if(fotoPerfil){foto = `/images/moradores/${fotoPerfil.filename}` }  
        tokenD = generateId()

        const novaSenhaPerfil = bcrypt.hashSync(novaSenha, 10)
        //const senhaPerfil = bcrypt.hashSync(cpfPerfil, 10)

        


        try {
            const editarPerfil = await Usuario.update({
                /*
                nome: user.nome,
                email: user.email,
                cpf: user.cpf,
                rg: user.rg,
                bloco_id: user.bloco_id,
                apartamento_id: user.apartamento_id,
                foto: user.foto,
                tipo_usuario_id: user.tipo_usuario_id,
                status: true,
                token: tokenD, */
                senha: novaSenhaPerfil,
               
               
            }, {
                where: { id: perfilId }
            })

            return res.redirect("/backoffice/morador/perfil")
        } catch (error) {
            return res.status(400).json(error);
        }
    } 
    
}