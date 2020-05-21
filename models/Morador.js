module.exports = (sequelize, DataTypes) => {
  const Morador = sequelize.define(
    "Morador", {
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
        type: DataTypes.STRING(50),
        allowNull: false
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: true
      },
      sindico: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      }
    }, {
      timestamps: true,
      freezeTableName: true,
      tableName: "moradores"
    }
  );

   Morador.associate = (models) => {
  //   Morador.belongsToMany(models.Funcionario, {
  //     through: models.Log_funcionario, //tab intermediaria
  //     foreignKey: "funcionario_id", // , as: ""
  //   });
  //   Morador.belongsToMany(models.Visitante, {
  //     through: models.Visita, //tab intermediaria
  //     foreignKey: "visitante_id", // , as: ""
  //   });
  //   Morador.hasMany(models.Veiculo, { //morador tem mtos veiculos
  //     foreignKey: "morador_id", // , as: ""
  //   });
  //   Morador.hasMany(models.Compromisso, {
  //     foreignKey: "morador_id", // , as: ""
  //   });
  //   Morador.hasMany(models.Empresa, {
  //     foreignKey: "morador_id", // , as: ""
  //   });
     Morador.hasMany(models.Pet, {
      foreignKey: "morador_id", // , as: ""
     });
  //   Morador.hasMany(models.Ocorrencia, {
  //     foreignKey: "morador_id", // , as: ""
   // });
    }

  return Morador;
};