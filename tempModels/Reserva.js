module.exports = (sequelize, DataTypes) => {
    const Reserva = sequelize.define(
      "Reserva",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          area_comum_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          data: {
            type: DataTypes.DATE,
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
        timestamps: true, // utliza
        tablename: "reservas"

      }
    );
  
    Reserva.associate = (models) => {
      Reserva.belongsTo(models.Area_comum, {
        foreignKey: "area_comum_id"
      });
  
    };
  
    
  
    return Reserva;
  };