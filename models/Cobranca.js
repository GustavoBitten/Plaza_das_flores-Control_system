module.exports = (sequelize, DataTypes) => {
    const Cobranca = sequelize.define(
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
            allowNull: false,
            references: {
              model: { 
                tablename: 'usuarios'
              },
              key: 'id'
            }
          },
          tipo_cobranca_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: { 
                tablename: 'tipos_cobrancas' 
              },
              key: 'id'
            }
          },
          data: {
            type: DataTypes.DATE()
          },
          titulo: {
            type: DataTypes.STRING()
          },
          descricao: {
            type: DataTypes.STRING()
          },
          valor: {
            type: DataTypes.FLOAT(),
          },
          vencimento: {
            type: DataTypes.DATE()
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
        // timestamps: true, // utliza
        freezeTableName: true,
        tableName: "cobrancas"

      }
    );
  
    Cobranca.associate = (models) => {
      Cobranca.belongsTo(models.Tipo_cobranca, {
        foreignKey: 'tipo_cobranca_id',
        as: 'tipo_cobranca'
      });
      Cobranca.belongsTo(models.Usuario,{
        foreignKey: "usuario_id",
        as: 'usuario'
    });
  
    };
  
    
  
    return Cobranca;
  };