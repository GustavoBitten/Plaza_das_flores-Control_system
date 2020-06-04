module.exports = (sequelize, DataTypes) => {
  const Bloco = sequelize.define(
    "Bloco", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      bloco: {
        type: DataTypes.STRING(2),
        allowNull: false
      },
    }, {
      freezeTableName: true,
      tableName: "blocos"
    }
  )

  Bloco.associate = (models) => {
    Bloco.hasMany(models.Usuario, {
      foreignKey: 'bloco_id',
      as: 'bl'
    })
  }

  return Bloco
}
