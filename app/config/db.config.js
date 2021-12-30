module.exports = {
  HOST: process.env.DBHOST || "localhost",
  USER: "root",
  PASSWORD: "123",
  DB: "tareasdb",
  PORT: "5432",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
