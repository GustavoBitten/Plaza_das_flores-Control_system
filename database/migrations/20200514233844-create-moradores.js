'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('moradores', {
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
      email: {
        type: Sequelize.STRING(192),
        unique: true,
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING(11),
        unique: true,
        allowNull: false
      },
      rg: {
        type: Sequelize.STRING(15),
        allowNull: true
      },
      bloco_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'blocos',
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
      },
      apartamento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'apartamentos',
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
      },
      senha: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sindico: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
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
    return queryInterface.dropTable('moradores')
  }
};