module.exports = (sequelize, DataTypes) => {
    const Tipo_notificacao = sequelize.define(
      "Tipo_notificacao",
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
        tablename: "tipos_notificacoes"

      }
    );
  
    Tipo_notificacao.associate = (models) => {
      Tipo_notificacao.hasMany(models.Notificacao, {
        foreignKey: "tipo_notificacoes_id",
      });
  
    };
  
    
  
    return Tipo_notificacao;
  };