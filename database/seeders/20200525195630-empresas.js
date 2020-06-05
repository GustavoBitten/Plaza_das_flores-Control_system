'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('empresas', [{
      morador_id: 1,
      nome: 'Saraiva',
      cnpj: '',
      rg: '',
      foto: '/images/padrao/padrao.png',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      morador_id: 2,
      nome: 'Sindico ltda',
      cnpj: '174624853214978',
      rg: '',
      foto: '/images/padrao/padrao.png',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('empresas', null, {})
  }
}