'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
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
        allowNull: true,
        references: {
          model: 'blocos',
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
      },
      apartamento_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'apartamentos',
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
      },
      senha: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tipo_usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipos_usuarios',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      token:{
        type: Sequelize.STRING(16),
        unique: true
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
    return queryInterface.dropTable('usuarios')
  }
};