'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tipos_notificacoes', [{
      tipo: 'notificacao',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: 'multa',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: 'chegada de encomenda',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tipos_notificacoes', null, {})
  }
}