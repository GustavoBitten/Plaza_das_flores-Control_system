'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tipos_ocorrencias', [{
      tipo: 'Reclamação',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: 'Sugestão',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: 'Manutenção',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tipos_ocorrencias', null, {})
  }
}