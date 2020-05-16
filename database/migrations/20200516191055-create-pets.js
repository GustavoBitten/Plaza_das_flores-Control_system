'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('pets', { 
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
          model: 'moradores',
          key: 'id'
        }
      },
      nome: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      raca: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      porte: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      foto: {
        type: Sequelize.STRING(45),
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
    return queryInterface.dropTable('pets')
  }
};