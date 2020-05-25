'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('apartamentos', [{
      apartamento: '11',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      apartamento: '12',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      apartamento: '21',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      apartamento: '22',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('apartamentos', null, {})
  }
}
