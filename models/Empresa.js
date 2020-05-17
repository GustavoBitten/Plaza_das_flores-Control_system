module.exports = (sequelize, DataTypes) => {
    const Empresa = sequelize.define(
      "Empresa",
      {
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
          nome: {
            type: Sequelize.STRING(192),
            allowNull: false
          },
          cnpj: {
            type: Sequelize.STRING(15),    
            unique: true,    
          },
          rg: {
            type: Sequelize.STRING(15),        
          },
          foto: {
            type: Sequelize.STRING,        
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false
    
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
    
          }
      },
      {
        timestamps: true, // utliza
        tablename: "empresas"
      }
    );

 
    return Empresa;
  };