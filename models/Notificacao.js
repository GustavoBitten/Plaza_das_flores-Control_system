module.exports = (sequelize, DataTypes) => {
    const Notificacao = sequelize.define(
      "Notificacao",
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
          tipo_notificacao_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          data: {
            type: DataTypes.DATE,
            allowNull: false
          },
          descricao: {
            type: DataTypes.STRING(),
            allowNull: false
          },
          situacao: {
            type: DataTypes.STRING(),
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
        tablename: "notificacoes"

      }
    );
  
    Notificacao.associate = (models) => {
      Notificacao.belongsTo(models.Tipo_notificacao, {
        foreignKey: "tipo_notificacao_id"
      });
      Notificacao.belongsTo(models.Usuario,{
        foreignKey: "usuario_id"
  });
    };
  
    
  
    return Notificacao;
  };