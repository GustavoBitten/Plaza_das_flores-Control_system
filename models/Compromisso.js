module.exports = (sequelize, DataTypes) => {
    const Compromisso = sequelize.define(
      "Compromisso",
      {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          compromisso: {
            type: Sequelize.STRING(192),
            allowNull: false
          },
          local: {
            type: Sequelize.STRING(50),
            allowNull: false
          },
          foto: {
            type: Sequelize.STRING,
            allowNull: true
          },
          morador_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: {tablename: 'moradores'},
              key: 'id'
            },
            onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
            onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
      },
      {
        timestamps: true, // utliza
        tablename: "compromissos"
      }
    );

    Compromisso.associate = (models) => {
      Compromisso.belongsTo(models.Morador, {
        foreignKey: "morador_id",  // , as: "moradores"
      });
  
    };
 
    return Compromisso;
  };