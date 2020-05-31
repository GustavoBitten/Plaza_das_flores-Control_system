module.exports = (sequelize, DataTypes) => {
    const Ocorrencia = sequelize.define(
      "Ocorrencia",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        }, 
        titulo: {
          type: DataTypes.STRING(45),
          allowNull: false
        },  
        mensagem: {
          type: DataTypes.STRING,
          allowNull: false
        },   
        resposta: {
          type: DataTypes.STRING,
          allowNull: true
        },
        arquivo: {
          type: DataTypes.STRING,
          allowNull: true
        },
        morador_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {tablename: 'usuarios'},
            key: 'id'
          },
          onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
          onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
        },
        administrador_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {tablename:'usuarios'},
            key: 'id'
          },
          onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
          onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
        },
        status_ocorrencia_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {tablename:'status_ocorrencias'},
            key: 'id'
          },
          onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
          onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
        },
        tipo_ocorrencia_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {tablename:'tipos_ocorrencias'},
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
      },
      {
        freezeTableName: true,
        tableName: "ocorrencias"
        

      }
    );
  
    Ocorrencia.associate = (models) => {
      Ocorrencia.belongsTo(models.Status_ocorrencia,{
          foreignKey: "status_ocorrencia_id"
      });
      Ocorrencia.belongsTo(models.Tipo_ocorrencia,{
        foreignKey: "tipo_ocorrencia_id"
     });
     Ocorrencia.belongsTo(models.Usuario,{
        foreignKey: "morador_id"
     });
    
    };
  
    
  
    return Ocorrencia;
  };
