'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('telefones', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false
      },
      morador_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {tablename:'moradores'},
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
      },
      tipo_telefone: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {tablename:'tipos_telefones'},
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false
      },


      createdAt: {
        type: Sequelize.DATE,
        allowNull: false

      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false

      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('telefones')
  }
};