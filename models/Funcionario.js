module.exports = (sequelize, DataTypes) => {
  const Funcionario = sequelize.define(
    "Funcionario",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "O campo Nome não pode ser vazio"
          },
          len: {
            args: [0, 45],
            msg: "Máx de 45 caracteres"
          }
        }

      },
      cpf: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "O campo CPF não pode ser vazio"
          },
          len:{
            args: [0,11],
            msg: "Máx de 11 caracteres"
          } 
      }
      },
      rg: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "O campo RG não pode ser vazio"
          },
          len:{
            args: [0,15],
            msg: "Máx de 15 caracteres"
          } 
      }
      },
      empresa: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        allowNull: false
      },
      tipo: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: true
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
      tableName: "funcionarios"
    }
  );

  Funcionario.associate = (models) => {
    Funcionario.belongsToMany(models.Usuario, {
      through: models.Log_funcionario,
      foreignKey: "funcionario_id",  // , as: "moradores"
    });

  };



  return Funcionario;
};
