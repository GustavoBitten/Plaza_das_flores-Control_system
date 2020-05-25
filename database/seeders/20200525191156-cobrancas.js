'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cobrancas', [{
      usuario_id: 1,
      tipo_cobranca_id: 1,
      valor: 649.99,
      codigo: '43tg34rtgrgfge34rtgf3',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      usuario_id: 2,
      tipo_cobranca_id: 1,
      valor: 649.99,
      codigo: '3refg3frgv345tgt354g35t4g5',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      usuario_id: 1,
      tipo_cobranca_id: 2,
      valor: 49.90,
      codigo: '54f2312487loo987023f3wef6',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      usuario_id: 2,
      tipo_cobranca_id: 3,
      valor: 80.00,
      codigo: 'd234rf453tyg653yy6h53',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cobrancas', null, {})
  }
}