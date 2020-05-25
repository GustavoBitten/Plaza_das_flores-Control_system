'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tipos_usuarios', [{
      funcao: 'morador',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      funcao: 'sindico',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      funcao: 'porteiro',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tipos_usuarios', null, {})
  }
}
