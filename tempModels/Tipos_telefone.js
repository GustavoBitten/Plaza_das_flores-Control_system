module.exports = (sequelize, DataTypes) => {
    const Tipos_telefone = sequelize.define(
      "Tipos_telefone",
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
        tablename: "tipos_telefones"
      }
    );

    Tipos_telefone.associate = (models) => {
      Tipos_telefone.hasMany(models.Telefone, {
        foreignKey: 'tipo_telefone_id',
      })
    }

 
    return Tipos_telefone;
  };
