module.exports = (sequelize, DataTypes) => {
    const Funcionario = sequelize.define(
      "Funcionario",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        nome: {
            type: DataTypes.STRING(192),
            allowNull: false
          },
          cpf: {
            type: DataTypes.STRING(11),
            unique: true,
            allowNull: false
          },
          rg: {
            type: DataTypes.STRING(15),
            allowNull: false
          },
          empresa: {
            type: DataTypes.STRING(45),
            allowNull: true
          },
          status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
            allowNull: false
          },
          tipo: {
            type: DataTypes.STRING(45),
            allowNull: true
          },
          foto: {
            type: DataTypes.STRING,
            allowNull: true
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
        timestamps: true, // utliza
        tablename: "funcionarios"

      }
    );
  
    Funcionario.associate = (models) => {
      Funcionario.belongsToMany(models.Morador, {
        through: "Log_funcionario",
        foreignKey: "funcionario_id",  // , as: "moradores"
      });
  
    };
  
    
  
    return Funcionario;
  };
