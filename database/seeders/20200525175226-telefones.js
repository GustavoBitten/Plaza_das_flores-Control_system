'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('telefones', [{
      morador_id: 1,
      tipo_telefone: 1,
      numero: '61995844556',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      morador_id: 1,
      tipo_telefone: 2,
      numero: '6138794556',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      morador_id: 2,
      tipo_telefone: 1,
      numero: '61945286515',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      morador_id: 3,
      tipo_telefone: 3,
      numero: '6134569840',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      morador_id: 2,
      tipo_telefone: 1,
      numero: '61945123578',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('telefones', null, {})
  }
}