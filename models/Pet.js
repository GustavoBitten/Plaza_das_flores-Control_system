module.exports = (sequelize, DataTypes) => {
    const Pet = sequelize.define(
        "Pet",
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
                    model: { tablename: 'moradores' },
                    key: 'id'
                },
                onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
                onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
            },
            nome: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            especie: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            porte: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            foto: {
                type: Sequelize.STRING,
                allowNull: true
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
            tablename: "pets"
        }
    );

    Pet.associate = (models) => {
        Pet.belongsTo(models.Morador, {
          foreignKey: "morador_id",  // , as: "moradores"
        });
    
      };


    return Pet;
};