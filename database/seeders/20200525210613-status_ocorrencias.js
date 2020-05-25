'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('status_ocorrencias', [{
      status: 'registrado',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      status: 'pendente',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      status: 'resolvido',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('status_ocorrencias', null, {})
  }
}