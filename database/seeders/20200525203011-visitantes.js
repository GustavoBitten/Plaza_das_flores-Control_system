'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('visitantes', [{
      nome: 'Júlio César Carvalho',
      foto: '/images/padrao/padrao.png',
      rg: '410418869SSP-SP',
      tipo: 'Amigo',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      nome: 'Silas Albuquerque',
      foto: '/images/padrao/padrao.png',
      rg: '189451026SSP-SP',
      tipo: 'Parente',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      nome: 'Alexandre Moreira',
      foto: '/images/padrao/padrao.png',
      rg: '451577838SSP-SP',
      tipo: 'Conhecido',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('visitantes', null, {})
  }
}