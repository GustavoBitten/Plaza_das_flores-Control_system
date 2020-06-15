const moment = require("moment");
const session = require('express-session')
const {
  Pet,
  Usuario,
  Veiculo,
  Compromisso,
  Empresa,
  Funcionario,
  Comunicado,
  Ocorrencia,
  Notificacao,
  Bloco,
  Apartamento,
  Visitante,
  Dependente,
  Telefone,
  Tipo_telefone,
} = require('../../models')

let backofficePageController = {
  moradorDashboard: async (req, res) => {

    const comunicados = await Comunicado.findAll({
      order: [
        ['created_at', 'DESC']
      ]
    })
    const ocorrencias = await Ocorrencia.findAll({
      order: [
        ['created_at', 'DESC']
      ]
    })
    const encomendas = await Notificacao.findAll({
      where: { morador_id: req.session.user.id, tipo_notificacoes_id: 3 },
      order: [
        ['created_at', 'DESC']
      ]
    })
    const notificacoes = await Notificacao.findAll({
      where: { morador_id: req.session.user.id, tipo_notificacoes_id: 1 },
      order: [
        ['created_at', 'DESC']
      ]
    })
    const multas = await Notificacao.findAll({
      where: { morador_id: req.session.user.id, tipo_notificacoes_id: 2 },
      order: [
        ['created_at', 'DESC']
      ]
    })
    res.render("backoffice/morador/dashboard", {
      titulo: "Morador - Dashboard",
      usuario: req.session.user,
      comunicados: comunicados,
      ocorrencias: ocorrencias,
      encomendas: encomendas,
      notificacoes: notificacoes,
      multas: multas
    })
  },



  moradorPerfil: async (req, res) => {

    const pets = await Pet.findAll({
      where: { morador_id: req.session.user.id },
      order: [
        ['created_at', 'DESC']
      ]
    })
    const veiculos = await Veiculo.findAll({
      where: { morador_id: req.session.user.id },
      order: [
        ['created_at', 'DESC']
      ],
    })

    const usuarios = await Usuario.findByPk(req.session.user.id, {
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
      order: [
        ['created_at', 'DESC']
      ]
    })



    const funcionarios = await Funcionario.findAll({
      include: {
        model: Usuario,
        where: { id: req.session.user.id },
      },
      order: [
        ['created_at', 'DESC']
      ]

    })
       
    

    const visitantes = await Visitante.findAll({
      include: {
        model: Usuario,
        where: { id: req.session.user.id },
       },
      order: [
        ['created_at', 'DESC']
      ]
    })

    const empresas = await Empresa.findAll({
      where: { morador_id: req.session.user.id },
      order: [
        ['created_at', 'DESC']
      ]
    })

    const compromissos = await Compromisso.findAll({
      where: { morador_id: req.session.user.id },
      order: [
        ['created_at', 'DESC']
      ]
    })

    const dependentes = await Dependente.findAll({
      where: {morador_id: req.session.user.id },
      include: {
        model: Usuario,
        required: true,
        where: {tipo_usuario_id: 1},
      },
    order: [
    ['created_at', 'DESC']
    ]
    })

     const telefones = await Telefone.findAll({
        where: { morador_id: req.session.user.id },
        include:[
          {
          model: Usuario
          },
          {
          model: Tipo_telefone,
          require: true,
          }
        ],
        order: [
          ['created_at', 'DESC']
        ]
      }
     )

    res.render("backoffice/perfil", {
      titulo: "Morador - Perfil",
      usuario: req.session.user,
      pets,
      veiculos,
      usuarios,
      compromissos,
      empresas,
      funcionarios,
      moment,
      visitantes,
      dependentes,
      telefones,

    })
  },
  //moradorOcorrencias: (req, res) => {
  //const listaOcorrencias = await Ocorrencia.findAll()
  //res.render("backoffice/morador/ocorrencias", {
  //titulo: "Morador - Ocorrências",
  //usuario: req.session.user
  //})
  //},
  moradorAreasComuns: (req, res) => {
    res.render("backoffice/morador/areasComuns", {
      titulo: "Morador - Áreas Comuns",
      usuario: req.session.user
    })
  },
  moradorPortaria: (req, res) => {
    res.render("backoffice/morador/portaria", {
      titulo: "Morador - Portaria",
      usuario: req.session.user
    })
  },
  moradorComunicados: (req, res) => {
    res.render("backoffice/morador/comunicados", {
      titulo: "Morador - Comunicados",
      usuario: req.session.user
    })
  },
  // moradorFinanceiro: (req, res) => {
  //   res.render("backoffice/morador/financeiro", {
  //     titulo: "Morador - Financeiro",
  //     usuario: req.session.user
  //   })
  // },
  moradorMoradores: async (req, res) => {
    const visitantes = await Visitante.findAll({
      order: [
        ['created_at', 'DESC']
      ]
    })

    const funcionarios = await Funcionario.findAll({
      order: [
        ['created_at', 'DESC']
      ]
    })

    res.render("backoffice/morador/moradores", {
      titulo: "Morador - Visitantes",
      usuario: req.session.user,
      visitantes: visitantes,
      funcionarios: funcionarios
    })
  },



  sindicoPerfil: (req, res) => {
    res.render("backoffice/sindico/perfil", {
      titulo: "Síndico - Perfil",
      usuario: req.session.user
    })
  },
  sindicoOcorrencias: (req, res) => {
    res.render("backoffice/sindico/ocorrencias", {
      titulo: "Síndico - Ocorrências",
      usuario: req.session.user
    })
  },
  sindicoAreasComuns: (req, res) => {
    res.render("backoffice/sindico/areasComuns", {
      titulo: "Síndico - Áreas Comuns",
      usuario: req.session.user
    })
  },
  sindicoMoradores: (req, res) => {
    res.render("backoffice/sindico/moradores", {
      titulo: "Síndico - Moradores",
      usuario: req.session.user
    })
  },
  sindicoPortaria: (req, res) => {
    res.render("backoffice/sindico/portaria", {
      titulo: "Síndico - Portaria",
      usuario: req.session.user
    })
  },
  // sindicoComunicados: (req,res) => {
  //   res.render("backoffice/sindico/comunicados", {titulo:"Síndico - Comunicados",usuario:req.session.user})
  // },
  sindicoFinanceiro: (req, res) => {
    res.render("backoffice/sindico/financeiro", {
      titulo: "Síndico - Financeiro",
      usuario: req.session.user
    })
  },



  portariaPerfil: (req, res) => {
    res.render("backoffice/portaria/perfil", {
      titulo: "Portaria - Perfil",
      usuario: req.session.user
    })
  },
  portariaOcorrencias: (req, res) => {
    res.render("backoffice/portaria/ocorrencias", {
      titulo: "Portaria - Ocorrências",
      usuario: req.session.user
    })
  },
  portariaAreasComuns: (req, res) => {
    res.render("backoffice/portaria/areasComuns", {
      titulo: "Portaria - Áreas Comuns",
      usuario: req.session.user
    })
  },
  portariaMoradores: (req, res) => {
    res.render("backoffice/portaria/moradores", {
      titulo: "Portaria - Moradores",
      usuario: req.session.user
    })
  },
  portariaCorrespondencias: (req, res) => {
    res.render("backoffice/portaria/correspondencias", {
      titulo: "Portaria - Correspondencias",
      usuario: req.session.user
    })
  },
  portariaComunicados: (req, res) => {
    res.render("backoffice/portaria/comunicados", {
      titulo: "Portaria - Comunicados",
      usuario: req.session.user
    })
  }



}


module.exports = backofficePageController