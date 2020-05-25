'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('compromissos', [{
      compromisso: 'Reuniao para discustir sobre reforma da piscina',
      local: 'Salão de festas',
      foto: '',
      morador_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      compromisso: 'Treinamento para novos porteiros',
      local: 'Pátio',
      foto: '',
      morador_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('compromissos', null, {})
  }
}