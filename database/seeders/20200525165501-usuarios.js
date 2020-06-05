'use strict';

const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios', [{
      nome: 'Morador Teste',
      email: 'morador@teste.com',
      cpf: '11111111111',
      rg: '',
      bloco_id: 1,
      apartamento_id: 1,
      senha: bcrypt.hashSync('11111111111', 10),
      foto: '/images/padrao/padrao.png',
      tipo_usuario_id: 1, 
      status: true,
      token: '34sd34gj',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      nome: 'Sindico Teste',
      email: 'sindico@teste.com',
      cpf: '22222222222',
      rg: '',
      bloco_id: 2,
      apartamento_id: 3,
      senha: bcrypt.hashSync('22222222222', 10),
      foto: '/images/padrao/padrao.png',
      tipo_usuario_id: 2, 
      status: true,
      token: '32ji54kl',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      nome: 'Porteiro Teste',
      email: 'porteiro@teste.com',
      cpf: '33333333333',
      rg: '',
      bloco_id: 1,
      apartamento_id: 2,
      senha: bcrypt.hashSync('33333333333', 10),
      foto: '/images/padrao/padrao.png',
      tipo_usuario_id: 3, 
      status: true,
      token: '53fs48qw',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {});
  }
};
