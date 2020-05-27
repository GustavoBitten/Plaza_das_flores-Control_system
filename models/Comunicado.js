module.exports = (sequelize, DataTypes) => {
  const Comunicado = sequelize.define(
    "Comunicado", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      sindico_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tablename: 'moradores'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
      },
      titulo: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      mensagem: {
        type: DataTypes.STRING(500),
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
    }, {
      freezeTableName: true,
      tableName: "comunicados"
    }
  );

  return Comunicado;
};