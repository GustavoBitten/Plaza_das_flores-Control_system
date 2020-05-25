'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('correspondencias', [{
      morador_id: 1,
      porteiro_id: 3,
      tipo_correspondencia_id: 2,
      situacao_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      morador_id: 1,
      porteiro_id: 3,
      tipo_correspondencia_id: 3,
      situacao_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      morador_id: 2,
      porteiro_id: 3,
      tipo_correspondencia_id: 1,
      situacao_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('correspondencias', null, {})
  }
}