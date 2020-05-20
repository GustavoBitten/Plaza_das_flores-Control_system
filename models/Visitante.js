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
          cpf: {
            type: DataTypes.STRING(11),
            allowNull: false
          },
          rg: {
            type: DataTypes.STRING(15),
            allowNull: false
          },
          tipo: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
            allowNull: false
          }
         
        
      },
      {
        timestamps: true, // utliza
        tablename: "visitantes"

      }
    );
  
    // Visitante.associate = (models) => {
    //   Visitante.belongsToMany(models.Morador, {
    //     through: models.Visita, // model intermediário
    //     foreignKey: "morador_id",  // , as: "moradores"
    //   });
  
    // };
  
    
  
    return Visitante;
  };
