'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pets', [{
      morador_id: 1,
      nome: 'Pet',
      especie: 'Dogue',
      porte: 'Pequeno',
      foto: '/images/padrao/padrao.png',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      morador_id: 1,
      nome: 'Repete',
      especie: 'Papagaio',
      porte: 'Grande',
      foto: '/images/padrao/padrao.png',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      morador_id: 2,
      nome: 'Miau',
      especie: 'Gato',
      porte: 'Pequeno',
      foto: '/images/padrao/padrao.png',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pets', null, {})
  }
}