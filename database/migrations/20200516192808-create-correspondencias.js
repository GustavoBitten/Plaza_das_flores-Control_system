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
          model: 'usuarios',
          key: 'id'
        }
      },
      porteiro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
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
      situacao_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'situacoes',
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
      },
      // Alterar para foreignKey de usuarios?
      retirado_por: {
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
    return queryInterface.dropTable('correspondencias')
  }
};