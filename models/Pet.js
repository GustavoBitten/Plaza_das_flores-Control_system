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
            model: {tablename:"usuarios"},
            key: 'id'
        },
        onUpdate: 'CASCADE', // whenever there is an user id alteration, udpate the foreign key too
        onDelete: 'CASCADE' // if an user gets deleted, delete publications of this user
    },
    nome: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    especie: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    porte: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true
    }
    
});

    Pet.associate = (models) => {
    Pet.belongsTo(models.Usuario, {
    foreignKey: "morador_id",  // , as: "moradores"
    });

};


    return Pet;
};