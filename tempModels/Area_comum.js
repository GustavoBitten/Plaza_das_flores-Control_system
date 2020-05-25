module.exports = (sequelize, DataTypes) => {
    const Area_comum = sequelize.define(
      "Area_comum",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        nome: {
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
        tablename: "areas_comuns"

      }
    );
  
    Area_comum.associate = (models) => {
      Area_comum.hasMany(models.Reserva, {
        foreignKey: "area_comum_id",
      });
  
    };
  
    
  
    return Area_comum;
  };
