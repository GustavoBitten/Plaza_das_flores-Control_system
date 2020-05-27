module.exports = (sequelize, DataTypes) => {
    const Veiculo = sequelize.define(
      "Veiculo",
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          modelo: {
            type: DataTypes.STRING(45),
            allowNull: false
          },
          placa: {
            type: DataTypes.STRING(8),
            allowNull: false
          },
          cor: {
            type: DataTypes.STRING(45),
            allowNull: false
          },
          foto: {
            type: DataTypes.STRING,
            allowNull: true
          },
          morador_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: {tablename: "moradores"},
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
          },
        
      },
      {
        timestamps: true, // utliza
        tablename: "veiculos"
      } 
    );

    Veiculo.associate = (models) => {
      Veiculo.belongsTo(models.Usuario, {
        foreignKey: "morador_id",  // , as: "moradores"
      });
  
    };

 
    return Veiculo;
  };