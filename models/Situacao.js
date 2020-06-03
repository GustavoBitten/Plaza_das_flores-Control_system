module.exports = (sequelize, DataTypes) => {
  const Situacao = sequelize.define(
    "Situacao", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      situacao: {
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
      }
    }, {
      freezeTableName: true,
      tableName: "situacoes"
    }
  )

  Situacao.associate = (models) => {
    Situacao.hasMany(models.Correspondencia, {
      foreignKey: 'situacao_id',
      as: 'status'
    })
  }

  return Situacao
}
