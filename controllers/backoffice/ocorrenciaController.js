const { Ocorrencia, Status_ocorrencia, Tipo_ocorrencia, Usuario, Bloco, Apartamento } = require('../../models')
const moment = require("moment");


module.exports = ocorrenciaController = {
    index: async (req, res) => {

        const url = req.originalUrl
        const urlParts = url.split('/')
        const typeRoute = urlParts[2]

        try{
            const listaOcorrencias = await Ocorrencia.findAll({
                include: [{
                    model: Usuario,
                    required: true,
                    include: [
                        {
                            model: Bloco,
                            required: true,
                        },
                    {
                        model: Apartamento,
                      required: true,
                    },
                  
                  ],
               },
               {
                   model: Status_ocorrencia,
                   required: true,
                },
                {
                    model: Tipo_ocorrencia,
                    required: true,
                },
                
            ], 
            order: [
                ['created_at', 'DESC']
              ]
              
            })

        const listaOcorrenciasMorador = await Ocorrencia.findAll({
            include: [{
                model: Usuario,
                required: true,
                where:{id : req.session.user.id},
               },
               {
                   model: Status_ocorrencia,
                   required: true,
                },
                {
                    model: Tipo_ocorrencia,
                    required: true,
                },
            
            ], 
            order: [
                ['created_at', 'DESC']
            ]
        })
        
        return res.render("backoffice/ocorrencias", {
            titulo: "Ocorrências",
            usuario: req.session.user,
            listaOcorrencias,
            listaOcorrenciasMorador,
            moment,
            typeRoute
            
        })}catch{
            return res.status(400).json(error);
        }
        
    },
    show: async (req, res) => {
        try {
            const { ocorrenciaId } = req.params
            
            const ocorrencia= await Ocorrencia.findByPk(ocorrenciaId)
            
            if(!ocorrencia)
            throw {erro: 'Ocorrencia não existe!'}
            
          return res.status(200).json(ocorrencia)
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    
    storeMorador: async (req, res) => {
        const { user } = req.session;
        const {tituloOcorrencia, tipoOcorrencia,mensagemOcorrencia } = req.body;
        const [arquivoOcorrencia] = req.files;
        
        const url = req.originalUrl
        const urlParts = url.split('/')
        const typeRoute = urlParts[2]
        
        let foto = null   
        if(foto == null){foto = `/images/padrao/padrao.png` } 
        if(arquivoOcorrencia){foto = `/images/ocorrencias/${arquivoOcorrencia.filename}` }  
    

        try {
            const novaOcorrencia = await Ocorrencia.create({
                titulo: tituloOcorrencia,
                mensagem: mensagemOcorrencia,
                resposta: null, 
                arquivo: foto,
                administrador_id: 2,	
                status_ocorrencia_id: 1, // padrão de cadastro: 1 - Registrado
                tipo_ocorrencia_id: parseInt(tipoOcorrencia),
                morador_id: user.id,
            })
            return res.status(201).redirect(`/backoffice/${typeRoute}/ocorrencias`)
        } catch (error) {
            return res.status(400).json(error);
        }

    },
    delete: async (req, res) => {
        const { ocorrenciaId } = req.params;

        try {
            const deleteOcorrencia = await Ocorrencia.destroy({
                where: [{ id: ocorrenciaId },
                ]
            });

            return res.status(200).json(deleteOcorrencia)
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    update: async (req, res) => {
        const { user } = req.session;
        const { ocorrenciaId } = req.params
        //const [arquivoOcorrencia] = req.files;
        const { respostaOcorrencia , statusOcorrencia} = req.body;

        const url = req.originalUrl
        const urlParts = url.split('/')
        const typeRoute = urlParts[2]


      ////  let foto = null   
      // if(foto == null){foto = `/images/padrao/padrao.png` } 
      //  if(arquivoOcorrencia){foto = `/images/ocorrencias/${arquivoOcorrencia.filename}` } 

        try {
            const editarOcorrencia = await Ocorrencia.update({
                resposta: respostaOcorrencia,
                status_ocorrencia_id: parseInt(statusOcorrencia), 
              //  arquivo: null,
            }, {
                where: { id: ocorrenciaId }
            })

                
            //return res.status(200).json(editarOcorrencia)
           return res.redirect(`/backoffice/${typeRoute}/ocorrencias`)
        }
        catch (error) {
            return res.status(400).json(error);
        }
    },

}