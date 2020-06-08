'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tipos_correspondencias', [{
      tipo: 'Carta',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: 'Encomenda',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: 'Cartão Bancário',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: 'Outros',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tipos_correspondencias', null, {})
  }
}
