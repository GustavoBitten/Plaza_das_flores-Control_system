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
      timestamps: true,
      tablename: "blocos"
    }
  );

  return Bloco;
};