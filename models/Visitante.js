module.exports = (sequelize, DataTypes) => {
    const Visitante = sequelize.define(
      "Visitante",
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          nome: {
            type: DataTypes.STRING,
            allowNull: false
          },
          foto: {
            type: DataTypes.STRING,
            allowNull: true
          },
          rg: {
            type: DataTypes.STRING(15),
            allowNull: false
          },
          tipo: {
            type: DataTypes.STRING(50),
            defaultValue: true,
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
        tableName: "visitantes"
      }
    );
  
    Visitante.associate = (models) => {
      Visitante.belongsToMany(models.Usuario, {
        through: models.Visita,
        foreignKey: "visitante_id",  // , as: "moradores"
      });
  
    };
  
  
  
    return Visitante;
  };
  