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
        morador_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: {tablename:'usuarios'},
              key: 'id'
            }
          },
          tipo_notificacoes_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: {tablename:'tipos_notificacoes'},
              key: 'id'
            }
          },
          data: {
            type: DataTypes.DATE,
            allowNull: false
          },
          descricao: {
            type: DataTypes.STRING(),
            allowNull: false
          },
          situacao_id: {
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
        freezeTableName: true,
        tableName: "notificacoes",
      }
    );
  
    Notificacao.associate = (models) => {
      Notificacao.belongsTo(models.Tipo_notificacao, {
        foreignKey: "tipo_notificacoes_id"
      });
      Notificacao.belongsTo(models.Usuario,{
        foreignKey: "morador_id"
  });
    };
  
    
  
    return Notificacao;
  };