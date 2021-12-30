const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const defaulturl = "postgres://root:123@localhost:5432/tareasdb";
sequelize = new Sequelize(process.env.DATABASE_URL||defaulturl, {
    dialect: 'postgres',
    protocol: 'postgres',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.personas = require("./personas.model.js")(sequelize, Sequelize);

module.exports = db;
