'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reservas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      morador_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
      },
      area_comum_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'areas_comuns',
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      motivo: {
        type: Sequelize.STRING(500),
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
    return queryInterface.dropTable('reservas')
  }
};