'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('notificacoes', [{
      morador_id: 1,
      descricao: 'Proibido uso de aparelhos de som acima de 60dB após as 22h e antes das 6h',
      situacao_id: 1,
      tipo_notificacoes_id: 1,
      data: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    }, {
      morador_id: 2,
      descricao: 'Chegada de encomenda, codigo de rastreio: BR234523452',
      situacao_id: 1,
      tipo_notificacoes_id: 3,
      data: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    }, {
      morador_id: 1,
      descricao: 'Proibido uso de aparelhos de som acima de 60dB após as 22h e antes das 6h',
      situacao_id: 1,
      tipo_notificacoes_id: 2,
      data: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('notificacoes', null, {})
  }
}