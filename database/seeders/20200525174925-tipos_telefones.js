'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tipos_telefones', [{
      tipo: 'pessoal',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: 'fixo',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: 'comercial',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tipos_telefones', null, {})
  }
}
