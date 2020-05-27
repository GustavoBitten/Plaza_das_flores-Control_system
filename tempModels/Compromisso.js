module.exports = (sequelize, DataTypes) => {
  const Compromisso = sequelize.define(
    "Compromisso",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      compromisso: {
        type: DataTypes.STRING(192),
        allowNull: false
      },
      local: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: true
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
      tablename: "compromissos"
    }
  );

  Compromisso.associate = (models) => {
    Compromisso.belongsTo(models.Usuario, {
      foreignKey: "morador_id",  // , as: "moradores"
    });

  };

  return Compromisso;
};