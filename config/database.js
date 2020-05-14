module.exports = {
  dialect: "sqlite",
  storage: "./db.development.sqlite",
  define: {
    timestamps: true, // set timestamps (created_at and updated_at) for all db tables
    underscored: true // set snake case isntead of native sequelize pascal/camel case
  }
}
