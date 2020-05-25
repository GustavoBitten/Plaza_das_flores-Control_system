'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tipos_cobrancas', [{
      tipo: 'mensalidade',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: 'multa',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: 'reserva de área comun',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: 'cópia de chave',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      tipo: 'cartão de acesso',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tipos_cobrancas', null, {})
  }
}