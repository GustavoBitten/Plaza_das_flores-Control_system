'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tipos_correspondencias', [{
      tipo: 'carta',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: 'encomenda',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: 'cartão bancário',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tipos_correspondencias', null, {})
  }
}