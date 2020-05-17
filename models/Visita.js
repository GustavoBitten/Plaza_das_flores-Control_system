module.exports = (sequelize, DataTypes) => {
    const Visita = sequelize.define(
      "Visita",
      {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },      
          morador_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: {tablename :'moradores'},
              key: 'id'
            },
            onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
            onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
          },
          visitante_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: {tablename:'visitantes'},
              key: 'id'
            },
            onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
            onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
          },
          tipo: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1,
            allowNull: false
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          }
        
      },
      {
        timestamps: true, // utliza
        tablename: "visitas"
      }
    );

 
    return Visita;
  };
