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
            type: DataTypes.STRING(192),
            allowNull: false,
            validate:{
              notEmpty: {
                  msg: "O campo Nome não pode ser vazio"
              },
              len:{
                  args: [0,192],
                  msg: "Máx de 192 caracteres"
                } 
    
          }
          },
          foto: {
            type: DataTypes.STRING,
            allowNull: true
          },
          rg: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate:{
              notEmpty: {
                  msg: "O campo Rg não pode ser vazio"
              },
              len:{
                  args: [0,15],
                  msg: "Máx de 15 caracteres"
                } 
    
          }
          },
          tipo: {
            type: DataTypes.STRING(50),
            defaultValue: true,
            allowNull: false,
            validate:{
              notEmpty: {
                  msg: "O campo Tipo não pode ser vazio"
              },
              len:{
                  args: [0,50],
                  msg: "Máx de 50 caracteres"
                } 
    
          }
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
  