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
        allowNull: false,
        validate:{
          notEmpty: {
              msg: "O campo Nome não pode ser vazio"
          },
          len:{
              args: [0,192],
              msg: "Máx de 192 caracteres"
            } 

      }
      },
      email: {
        type: DataTypes.STRING(192),
        unique: true,
        allowNull: false,
        validate:{
          notEmpty: {
              msg: "O campo E-mail não pode ser vazio"
          },
          len:{
              args: [0,192],
              msg: "Máx de 192 caracteres"
            } 

      }
      },
      cpf: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false,
        validate:{
          notEmpty: {
              msg: "O campo cpf não pode ser vazio"
          },
          len:{
              args: [0,11],
              msg: "Máx de 11 caracteres"
            } 

      }
      },
      rg: {
        type: DataTypes.STRING(15),
        allowNull: true
      },
      bloco_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
        allowNull: true,
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
        allowNull: false,
        validate:{
          notEmpty: {
              msg: "O campo Senha não pode ser vazio"
          },
          len:{
              args: [0,150],
              msg: "Máx de 192 caracteres"
            } 

      }
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
    Usuario.belongsTo(models.Apartamento, {
      foreignKey: 'apartamento_id',
      as: 'ap'
    })

    Usuario.belongsTo(models.Bloco, {
      foreignKey: 'bloco_id',
      as: 'bl'
    })

    Usuario.belongsToMany(models.Funcionario, {
      through: models.Log_funcionario,
      foreignKey: "morador_id", //
    });
    Usuario.belongsToMany(models.Visitante, {
         through: models.Visita,
         foreignKey: "morador_id", 
       });
    Usuario.hasMany(models.Veiculo, {
      foreignKey: "morador_id",
    });
    Usuario.hasMany(models.Compromisso, {
      foreignKey: "morador_id",
    });
       Usuario.hasMany(models.Empresa, {
         foreignKey: "morador_id", 
       });
    Usuario.hasMany(models.Pet, {
      foreignKey: "morador_id",
    });
    Usuario.hasMany(models.Ocorrencia, {
      foreignKey: "morador_id",
    });
    Usuario.hasMany(models.Notificacao, {
      foreignKey: "morador_id",
    });

    Usuario.hasMany(models.Correspondencia, {
      foreignKey: 'morador_id',
      as: 'morador'
    })

    Usuario.hasMany(models.Correspondencia, {
      foreignKey: 'porteiro_id',
      as: 'porteiro'
    })

    Usuario.hasMany(models.Correspondencia, {
      foreignKey: 'retirado_por',
      as: 'retirado'
    })
    
    Usuario.belongsTo(models.Apartamento, {
      foreignKey: "apartamento_id",  
      });

    Usuario.belongsTo(models.Bloco, {
      foreignKey: "bloco_id",  
      });

     Usuario.hasMany(models.Telefone, {
        foreignKey: 'morador_id'
      })
      Usuario.hasMany(models.Dependente, {
        foreignKey: 'dependente_id'
      })
      Usuario.hasMany(models.Cobranca, {
        foreignKey: "usuario_id",
        as: 'usuario'
         
      });
  }

  return Usuario;
};
