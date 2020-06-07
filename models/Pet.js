module.exports = (sequelize, DataTypes) => {
    const Pet = sequelize.define("Pet",{
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
        nome: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate:{
                notEmpty: {
                    msg: "O campo Nome não pode ser vazio"
                },
                len:{
                    args: [0,45],
                    msg: "Máx de 45 caracteres"
                  } 

            }
        },
        especie: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate:{
                notEmpty: {
                    msg: "O campo Espécie não pode ser vazia"
                },
                len:{
                    args: [0,45],
                    msg: "Máx de 45 caracteres"
                  } 

            }
        },
        porte: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate:{
                notEmpty: {
                    msg: "O campo Porte não pode ser vazio"
                },
                len:{
                    args: [0,45],
                    msg: "Máx de 45 caracteres"
                  } 

            }
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true,
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
        tableName: "pets"
    });
    
        Pet.associate = (models) => {
        Pet.belongsTo(models.Usuario, {
        foreignKey: "morador_id",  
        });
    
    };
    
    
        return Pet;
    };