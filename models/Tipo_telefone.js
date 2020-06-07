module.exports = (sequelize, DataTypes) => {
    const Tipo_telefone = sequelize.define(
      "Tipo_telefone",
      {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
        },
        tipo: {
        type: DataTypes.STRING,
        allowNull: false
        },        
        created_at: {
        type: DataTypes.DATE,
        allowNull: false
        },
        updated_at: {
        type: DataTypes.DATE,
        allowNull: false
        }
        
      },
      {
        freezeTableName: true,
        tableName: "tipos_telefones"
      }
    );

    Tipo_telefone.associate = (models) => {
      Tipo_telefone.hasMany(models.Telefone, {
        foreignKey: 'tipo_telefone',
      })
    }

 
    return Tipo_telefone;
  };
