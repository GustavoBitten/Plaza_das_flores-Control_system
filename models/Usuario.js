module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: {
        type: DataTypes.STRING(192),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(192),
        unique: true,
        allowNull: false
      },
      cpf: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false
      },
      rg: {
        type: DataTypes.STRING(15),
        allowNull: true
      },
      bloco_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tablename: 'blocos'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
      },
      apartamento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tablename: 'apartamentos'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
      },
      senha: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: true
      },
      tipo_usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }, 
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      token:{
        type: DataTypes.STRING,
        unique: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      freezeTableName: true,
      tableName: "usuarios"
    }
  );

   Usuario.associate = (models) => {
   Usuario.belongsToMany(models.Funcionario, {
       through: models.Log_funcionario, 
       foreignKey: "funcionario_id", //
     });
  //   Usuario.belongsToMany(models.Visitante, {
  //     through: models.Visita, //tab intermediaria
  //     foreignKey: "visitante_id", // 
  //   });
    Usuario.hasMany(models.Veiculo, { 
      foreignKey: "morador_id", 
    });
    Usuario.hasMany(models.Compromisso, {
      foreignKey: "morador_id", 
    });
  //   Usuario.hasMany(models.Empresa, {
  //     foreignKey: "morador_id", // 
  //   });
    Usuario.hasMany(models.Pet, {
      foreignKey: "morador_id", 
     });
    Usuario.hasMany(models.Ocorrencia, {
       foreignKey: "morador_id", 
    });
    }

  return Usuario;
};