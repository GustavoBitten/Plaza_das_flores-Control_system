'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('areas_comuns', [{
      nome: 'Salão de festas',
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      nome: 'Churrasqueira 1',
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      nome: 'Churrasqueira 2',
      status: false,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('areas_comuns', null, {})
  }
}