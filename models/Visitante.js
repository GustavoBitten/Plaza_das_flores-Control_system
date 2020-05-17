module.exports = (sequelize, DataTypes) => {
    const Visitante = sequelize.define(
      "Visitante",
      {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },      
          nome: {
            type: Sequelize.STRING,
            allowNull: false
          },
          cpf: {
            type: Sequelize.STRING(11),
            allowNull: false
          },
          rg: {
            type: Sequelize.STRING(15),
            allowNull: false
          },
          tipo: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1,
            allowNull: false
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          }
        
      },
      {
        timestamps: true, // utliza
        tablename: "visitantes"

      }
    );
  
    Visitante.associate = (models) => {
      Visitante.belongsToMany(models.Morador, {
        through: models.Visita,
        foreignKey: "morador_id",  // , as: "moradores"
      });
  
    };
  
    
  
    return Visitante;
  };
