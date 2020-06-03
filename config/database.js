module.exports = {
  username: "wfnrcycz",
  password: "M9D6ZTKNMPLpWoCGuw64DB-eJgNMAQJR",
  database: "wfnrcycz",
  host: "tuffi.db.elephantsql.com",
  dialect: "postgres",
  define: {
    timestamps: true, // set timestamps (created_at and updated_at) for all db tables
    underscored: true, // set snake case isntead of native sequelize pascal/camel case
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}
