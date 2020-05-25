'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ocorrencias', [{
      titulo: 'Lâmpada queimada',
      mensagem: 'Lâmpada queimada na entrada do bloco A',
      Resposta: '',
      arquivo: '',
      morador_id: 1,
      administrador_id: 2,
      status_ocorrencia_id: 1,
      tipo_ocorrencia_id: 3,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      titulo: 'Barulho',
      mensagem: 'Barulho excessivo vindo do apartamento XPTO',
      Resposta: 'Morador do apartamento XPTO foi notificado, favor informar em caso de reincidência',
      arquivo: '',
      morador_id: 1,
      administrador_id: 2,
      status_ocorrencia_id: 3,
      tipo_ocorrencia_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      titulo: 'Trocar lâmpadas',
      mensagem: 'Trocar as lâmpadas por led',
      Resposta: '',
      arquivo: '',
      morador_id: 1,
      administrador_id: 2,
      status_ocorrencia_id: 2,
      tipo_ocorrencia_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ocorrencias', null, {})
  }
}