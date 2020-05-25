module.exports = (sequelize, DataTypes) => {
    const RCobranca = sequelize.define(
      "Cobranca",
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
          tipo_cobranca_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          valor: {
            type: DataTypes.FLOAT(),
          },
          codigo: {
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
        timestamps: true, // utliza
        tablename: "cobrancas"

      }
    );
  
    Cobranca.associate = (models) => {
      Cobranca.belongsTo(models.Tipo_cobranca, {
        foreignKey: "tipo_cobranca_id"
      });
      Ocorrencia.belongsTo(models.Usuario,{
        foreignKey: "usuario_id"
    });
  
    };
  
    
  
    return Reserva;
  };