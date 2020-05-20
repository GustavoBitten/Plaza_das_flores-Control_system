module.exports = (sequelize, DataTypes) => {
    const Telefone = sequelize.define(
      "Telefone",
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
              model: {tablename:'moradores'},
              key: 'id'
            },
            onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
            onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
          },
          tipo_telefone_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: {tablename:'tipos_telefones'},
              key: 'id'
            },
            onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
            onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
          },
          numero: {
            type: DataTypes.STRING(11),
            allowNull: false
          },
          
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false
    
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
    
          }
      },
      {
        timestamps: true, // utliza
        tablename: "telefones"
      }
    );

    Telefone.associate = (models) => {
      Telefone.belongsTo(models.Morador, {
        foreignKey: "morador_id",  // , as: "moradores"
      });
  
    };
    Telefone.associate = (models) => {
        Telefone.belongsTo(models.Tipos_Telefone, {
          foreignKey: "tipo_telefone_id",  // , as: "tipos_telefones"
        });
    
      };

 
    return Telefone;
  };