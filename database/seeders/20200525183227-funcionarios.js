'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('funcionarios', [{
      nome: 'Salvador Santos',
      cpf: '25627405058',
      rg: '',
      empresa: 'Saraiva, Moraes and Nogueira',
      status: true,
      tipo: 'Pintor',
      foto: '/images/padrao/padrao.png',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      nome: 'Marcela Albuquerque',
      cpf: '30300410000',
      rg: '',
      empresa: 'Braga LTDA',
      status: true,
      tipo: 'Enfermeira',
      foto: '/images/padrao/padrao.png',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      nome: 'Meire Carvalho',
      cpf: '59469348052',
      rg: '',
      empresa: 'Oliveira e Associados',
      status: true,
      tipo: 'Eletricista',
      foto: '/images/padrao/padrao.png',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('funcionarios', null, {})
  }
}