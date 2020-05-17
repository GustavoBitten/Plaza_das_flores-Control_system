module.exports = (sequelize, DataTypes) => {
    const Tipos_telefone = sequelize.define(
      "Tipos_telefone",
      {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
        },
        tipo: {
        type: DataTypes.STRING,
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
        
      },
      {
        timestamps: true, // utliza
        tablename: "tipos_telefones"
      }
    );

 
    return Tipos_telefone;
  };
