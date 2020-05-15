
    'use strict';

    module.exports = {
      up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('cobrancas', { 
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
            },
            onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
            onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
          },
          tipo_cobrancas_id: {
            type: Sequelize.STRING(100),
            allowNull: false,
            references: {
              model: 'tipo_cobrancas',
              key: 'id'
            },
            onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
            onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
         
          },
          valor:{
            type: Sequelize.FLOAT()
          },
          codigo:{
            type: Sequelize.STRING(50),
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
        return queryInterface.dropTable('cobrancas')
      }
    };
    