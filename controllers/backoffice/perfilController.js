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

    updatePerfil: async (req, res) => {
        const { user } = req.session;
        const { emailPerfil} = req.body;
        const [fotoPerfil] = req.files;
        const { perfilId } = req.params;


       let foto = null;
        if(foto == null){ 
            foto = await Usuario.findByPk(user.id)
            foto = foto.foto } 
        if(fotoPerfil){foto = `/images/moradores/${fotoPerfil.filename}` }  
        //tokenD = generateId()

        
        let emailP = emailPerfil
        if(emailP == '') {
            const email = await Usuario.findByPk(user.id)
            emailP = email.email
        }

        try {
            const editarPerfil = await Usuario.update({
                foto: foto,
                email: emailP ,
                //nome: user.nome,
               // cpf: user.cpf,
               // rg: user.rg,
                //bloco_id: user.bloco_id,
               // apartamento_id: user.apartamento_id,
                //tipo_usuario_id: user.tipo_usuario_id,
               
            }, {
                where: { id: perfilId }
            })

            return res.redirect("/backoffice/morador/perfil")
        } catch (error) {
            return res.status(400).json(error);
        }
    } 
    
}