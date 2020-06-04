'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('situacoes', [{
      situacao: 'Pendente',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      situacao: 'Aprovado',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      situacao: 'Reprovado',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      situacao: 'Retirado',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('situacoes', null, {})
  }
};
