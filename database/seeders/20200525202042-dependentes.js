'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('dependentes', [{
      morador_id: 1,
      dependente_id: 2,
      data: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('dependentes', null, {})
  }
}