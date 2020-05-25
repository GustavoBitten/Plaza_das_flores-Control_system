'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('comunicados', [{
      sindico_id: 2,
      titulo: 'Reforma da Piscina',
      mensagem: 'A piscina vai estar interditada para realizarmos a reforma durante os dias 15 e 22',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      sindico_id: 2,
      titulo: 'Lorem ipsum dolor sit amet',
      mensagem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui vivamus arcu felis bibendum. A iaculis at erat pellentesque adipiscing commodo. Placerat vestibulum lectus mauris ultrices eros in cursus.',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      sindico_id: 2,
      titulo: 'Sed egestas egestas fringilla',
      mensagem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed egestas egestas fringilla phasellus faucibus scelerisque. Massa massa ultricies mi quis hendrerit dolor magna eget est. Dui sapien eget mi proin sed libero.',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comunicados', null, {})
  }
}