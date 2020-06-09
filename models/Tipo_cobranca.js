module.exports = (sequelize, DataTypes) => {
    const Tipo_cobranca = sequelize.define(
      "Tipo_cobranca",
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
        //timestamps: true,
        freezeTableName: true,
        tableName: "tipos_cobrancas"

      }
    );
  
    Tipo_cobranca.associate = (models) => {
      Tipo_cobranca.hasMany(models.Cobranca, {
        foreignKey: "tipo_cobranca_id",
        as: 'tipo_cobranca'
      });
  
    };
  
    
  
    return Tipo_cobranca
  };