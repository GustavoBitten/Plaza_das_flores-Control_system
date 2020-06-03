module.exports = (sequelize, DataTypes) => {
  const Tipo_correspondencia = sequelize.define(
    "Tipo_correspondencia",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      tipo: {
        type: DataTypes.STRING(45),
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
      freezeTableName: true,
      tableName: "tipos_correspondencias"
    }
  )

  Tipo_correspondencia.associate = (models) => {
    Tipo_correspondencia.hasMany(models.Correspondencia, {
      foreignKey: "tipo_correspondencia_id",
      as: 'tipo_correspondencia'
    })
  }

  return Tipo_correspondencia
}
