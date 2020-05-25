'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ocorrencias', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      }, 
      titulo: {
        type: Sequelize.STRING(45),
        allowNull: false
      },  
      mensagem: {
        type: Sequelize.STRING,
        allowNull: false
      },   
      resposta: {
        type: Sequelize.STRING,
        allowNull: true
      },
      arquivo: {
        type: Sequelize.STRING,
        allowNull: true
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
      administrador_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
      },
      status_ocorrencia_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'status_ocorrencias',
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
      },
      tipo_ocorrencia_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipos_ocorrencias',
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
    return queryInterface.dropTable('ocorrencias')
  }
};
