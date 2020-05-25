'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    let date = new Date()

    return queryInterface.bulkInsert('reservas', [{
      morador_id: 1,
      area_comum_id: 1,
      data: new Date(date.setDate(date.getDate() + 1)),
      status: true,
      motivo: '',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      morador_id: 1,
      area_comum_id: 3,
      data: new Date(date.setDate(date.getDate() + 2)),
      status: false,
      motivo: 'Churrasqueira fechada para evento',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      morador_id: 1,
      area_comum_id: 2,
      data: new Date(date.setDate(date.getDate() + 1)),
      status: true,
      motivo: '',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('reservas', null, {})
  }
}