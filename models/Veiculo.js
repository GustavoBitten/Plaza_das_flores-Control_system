module.exports = (sequelize, DataTypes) => {
  const Veiculo = sequelize.define(
    "Veiculo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      modelo: {
        type: DataTypes.STRING(45),
        allowNull: false,
          type: DataTypes.STRING(45),
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "O campo Modelo não pode ser vazio"
            },
            len:{
              args: [0,45],
              msg: "Máx de 45 caracteres"
            } 
        }
      },
      placa: {
        type: DataTypes.STRING(8),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "O campo Placa não pode ser vazio"
          },
          len:{
            args: [0,8],
            msg: "Máx de 8 caracteres"
          } 
        }
      },
      cor: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "O campo Cor não pode ser vazio"
          },
          len:{
            args: [0,45],
            msg: "Máx de 45 caracteres"
          } 
      }
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: true
      },
      morador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tablename: "moradores" },
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      },

    },
    {
      timestamps: true, // utliza
      tablename: "veiculos"
    }
  );

  Veiculo.associate = (models) => {
    Veiculo.belongsTo(models.Usuario, {
      foreignKey: "morador_id",  // , as: "moradores"
    });

  };


  return Veiculo;
};