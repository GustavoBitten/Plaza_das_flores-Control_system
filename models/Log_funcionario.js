module.exports = (sequelize, DataTypes) => {
  const Log_funcionario = sequelize.define(
    "Log_funcionario",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      tipo: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        allowNull: false
      },
      morador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tablename: "usuarios" },
          key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
      },
      funcionario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tablename: "funcionarios" },
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
      tableName: "log_funcionarios"
    }
  );


  return Log_funcionario;
};
