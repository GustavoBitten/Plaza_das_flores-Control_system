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
        type: DataTypes.STRING(192),
        allowNull: false
      },
      cnpj: {
        type: DataTypes.STRING(15),
        unique: true,
      },
      rg: {
        type: DataTypes.STRING(15),
      },
      foto: {
        type: DataTypes.STRING,
      },
    },
    
  );

  Empresa.associate = (models) => {
   Empresa.belongsTo(models.Usuario, {
   foreignKey: "morador_id",  // , as: "moradores"
    });

  };


  return Empresa;
};