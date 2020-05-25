'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('visitas', [{
      morador_id: 1,
      visitante_id: 1,
      tipo: true,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      morador_id: 1,
      visitante_id: 1,
      tipo: false,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      morador_id: 2,
      visitante_id: 3,
      tipo: true,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      morador_id: 1,
      visitante_id: 2,
      tipo: true,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      morador_id: 2,
      visitante_id: 3,
      tipo: false,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('visitas', null, {})
  }
}