module.exports = (sequelize, DataTypes) => {
    const Tipo_usuario = sequelize.define(
      "Tipo_usuario",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        funcao: {
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
        timestamps: true,
        tablename: "tipos_usuarios"

      }
    );
  
    Tipo_usuario.associate = (models) => {
      Tipo_usuario.hasMany(models.Usuario, {
        foreignKey: "tipo_usuario_id",
      });
  
    };
  
    
  
    return Tipo_usuario;
  };