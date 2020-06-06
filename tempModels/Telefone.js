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
          usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: {tablename: 'usuarios'},
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
        tablename: "telefones"
      }
    );

    

    Telefone.associate = (models) => {
        Telefone.belongsTo(models.Tipos_telefone, {
          foreignKey: 'tipo_telefone_id',
        })
        Telefone.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
      })
      
    }

    
      

 
    return Telefone;
  };