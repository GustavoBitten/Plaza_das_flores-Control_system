'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('funcionarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING(192),
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING(11),
        unique: true,
        allowNull: false
      },
      rg: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      empresa: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      tipo: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('funcionarios')
  }
};