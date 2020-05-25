module.exports = (sequelize, DataTypes) => {
    const Tipo_correspondencia = sequelize.define(
      "Tipo_correspondencia",
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
        timestamps: true,
        tablename: "tipos_correspondencias"

      }
    );
  
    Tipo_correspondencia.associate = (models) => {
      Tipo_correspondencia.hasMany(models.Correspondencia, {
        foreignKey: "tipo_correspondencia_id",
      });
  
    };
  
    
  
    return Tipo_correspondencia;
  };
