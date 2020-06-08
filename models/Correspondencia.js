module.exports = (sequelize, DataTypes) => {
  const Correspondencia = sequelize.define(
    "Correspondencia", {
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
          model: {
            tablename: 'usuarios'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      porteiro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tablename: 'usuarios'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tipo_correspondencia_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tablename: 'tipos_correspondencias'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      rastreio: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      situacao_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tablename: 'situacoes'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      retirado_por: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: {
            tablename: 'usuarios'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      data_retirada: {
        type: DataTypes.DATE,
        allowNull: true
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
      tableName: "correspondencias"
    }
  )

  Correspondencia.associate = (models) => {
    Correspondencia.belongsTo(models.Usuario, {
      foreignKey: 'morador_id',
      as: 'morador'
    })

    Correspondencia.belongsTo(models.Usuario, {
      foreignKey: 'porteiro_id',
      as: 'porteiro'
    })

    Correspondencia.belongsTo(models.Tipo_correspondencia, {
      foreignKey: 'tipo_correspondencia_id',
      as: 'tipo_correspondencia'
    })

    Correspondencia.belongsTo(models.Situacao, {
      foreignKey: 'situacao_id',
      as: 'status'
    })

    Correspondencia.belongsTo(models.Usuario, {
      foreignKey: 'retirado_por',
      as: 'retirado'
    })
  }

  return Correspondencia
}
