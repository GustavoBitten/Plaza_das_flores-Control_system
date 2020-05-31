module.exports = (sequelize, DataTypes) => {
    const Status_ocorrencia = sequelize.define(
      "Status_ocorrencia",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        status: {
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
          tableName: "status_ocorrencias"
          
  
        }
        );
  
    Status_ocorrencia.associate = (models) => {
      Status_ocorrencia.hasMany(models.Ocorrencia, {
        foreignKey: "status_ocorrencia_id",  // , as: ""
      });
  
    };
  
    
  
    return Status_ocorrencia;
  };
