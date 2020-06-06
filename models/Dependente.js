module.exports = (sequelize, DataTypes) => {
    const Dependente = sequelize.define(
      "Dependente", {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        morador_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: {tablename:'usuarios'},
              key: 'id'
            },
            onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
            onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
          },
          dependente_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: {tablename:'usuarios'},
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
          }

      }, {
        freezeTableName: true,
        tableName: "dependentes"
      }
    )
  
    Dependente.associate = (models) => {
      Dependente.belongsTo(models.Usuario, {
        foreignKey: 'morador_id',
      }),
      Dependente.belongsTo(models.Usuario, {
        foreignKey: 'Dependente_id',
      })
      
    }
  
    return Dependente
  }
  