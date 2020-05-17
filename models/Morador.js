module.exports = (sequelize, DataTypes) => {
    const Morador = sequelize.define(
      "Morador",
      {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
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
            allowNull: false,
            references: {
              model: 'blocos',
              key: 'id'
            },
            onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
            onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
          },
          apartamento_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'apartamentos',
              key: 'id'
            },
            onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
            onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
          },
          senha: {
            type: Sequelize.STRING(50),
            allowNull: false
          },
          foto: {
            type: Sequelize.STRING,
            allowNull: true
          },
          sindico: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
            allowNull: false
          },
          status: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1,
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
      },
      {
        timestamps: true, // utliza
        tablename: "moradores"

      }
    );
  
    Morador.associate = (models) => {
        Morador.belongsToMany(models.Funcionario, {
            through: models.Log_funcionario, //tab intermediaria
            foreignKey: "funcionario_id",  // , as: ""
        });
        Morador.belongsToMany(models.Visitante, {
            through: models.Visita, //tab intermediaria
            foreignKey: "visitante_id",  // , as: ""
        });
        Morador.hasMany(models.Veiculo, {  //morador tem mtos veiculos
            foreignKey: "morador_id",  // , as: ""
        });
        Morador.hasMany(models.Compromisso, {
            foreignKey: "morador_id",  // , as: ""
        });
        Morador.hasMany(models.Empresa, {
            foreignKey: "morador_id",  // , as: ""
        });
        Morador.hasMany(models.Pet, {
            foreignKey: "morador_id",  // , as: ""
        });
        Morador.hasMany(models.Ocorrencia, {
            foreignKey: "morador_id",  // , as: ""
        });
      
    };
  
    
  
    return Ocorrencia;
  };
