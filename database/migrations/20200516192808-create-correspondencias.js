'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('correspondencias', { 
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
      porteiro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'porteiros',
          key: 'id'
        }
      },
      tipo_correspondencia_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipos_correspondencias',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      retirado_por: {
        type: Sequelize.STRING(45),
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
    return queryInterface.dropTable('correspondencias')
  }
};