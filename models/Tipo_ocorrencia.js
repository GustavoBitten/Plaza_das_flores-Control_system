module.exports = (sequelize, DataTypes) => {
    const Tipo_ocorrencia = sequelize.define(
      "Tipo_ocorrencia",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        tipo: {
            type: DataTypes.STRING(50),
            allowNull: false
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
          freezeTableName: true,
          tableName: "tipos_ocorrencias"
          
  
        }
        );
  
    Tipo_ocorrencia.associate = (models) => {
      Tipo_ocorrencia.hasMany(models.Ocorrencia, {
        foreignKey: "tipo_ocorrencia_id",  // , as: ""
      });
  
    };
  
    
  
    return Tipo_ocorrencia;
  };
