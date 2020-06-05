'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('veiculos', [{
      modelo: 'Toyota Etios',
      placa: 'SDF-7516',
      cor: 'Prata',
      foto: '/images/padrao/padrao.png',
      morador_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      modelo: 'Honda Civic',
      placa: 'GEW-5832',
      cor: 'Preto',
      foto: '/images/padrao/padrao.png',
      morador_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('veiculos', null, {})
  }
}