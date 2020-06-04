module.exports = (sequelize, DataTypes) => {
  const Apartamento = sequelize.define(
    "Apartamento", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      apartamento: {
        type: DataTypes.STRING(2),
        allowNull: false
      },
    }, {
      freezeTableName: true,
      tableName: "apartamentos"
    }
  )

  Apartamento.associate = (models) => {
    Apartamento.hasMany(models.Usuario, {
      foreignKey: 'apartamento_id',
      as: 'ap'
    })
  }

  return Apartamento
}
