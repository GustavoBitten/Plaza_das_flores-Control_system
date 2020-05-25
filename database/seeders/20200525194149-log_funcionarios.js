'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('log_funcionarios', [{
      tipo: true,
      morador_id: 1,
      funcionario_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: false,
      morador_id: 1,
      funcionario_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: true,
      morador_id: 2,
      funcionario_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: true,
      morador_id: 1,
      funcionario_id: 3,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: false,
      morador_id: 1,
      funcionario_id: 3,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: false,
      morador_id: 2,
      funcionario_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('log_funcionarios', null, {})
  }
}