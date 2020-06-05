module.exports = (sequelize, DataTypes) => {
  const Empresa = sequelize.define(
    "Empresa",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
      },
      morador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tablename: 'moradores' },
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
      },
      nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "O campo Empresa não pode ser vazio"
          },
          len:{
            args: [0,50],
            msg: "Máx de 50 caracteres"
          } 
      }
      },
      cnpj: {
        type: DataTypes.STRING(15),
        unique: true,
        validate: {
          notEmpty: {
            msg: "O campo CNPJ não pode ser vazio"
          },
          len:{
            args: [0,15],
            msg: "Máx de 15 caracteres"
          } 
      }
      },
      rg: {
        type: DataTypes.STRING(15),
        validate: {
          notEmpty: {
            msg: "O campo RG não pode ser vazio"
          },
          len:{
            args: [0,15],
            msg: "Máx de 15 caracteres"
          } 
               
      }
      },
      foto: {
        type: DataTypes.STRING,
      },
    },
    
  );

  Empresa.associate = (models) => {
   Empresa.belongsTo(models.Usuario, {
   foreignKey: "morador_id",  
    });

  };


  return Empresa;
};