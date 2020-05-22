'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('veiculos', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      modelo: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      placa: {
        type: Sequelize.STRING(8),
        allowNull: false
      },
      cor: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: true
      },
      morador_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:  "usuarios",
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
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
    return queryInterface.dropTable('veiculos')
  }
};
