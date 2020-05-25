'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('blocos', [{
      bloco: 'A',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      bloco: 'B',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      bloco: 'C',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('blocos', null, {})
  }
}
