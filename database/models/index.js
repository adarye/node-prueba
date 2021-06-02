const dbConfig = require("../db");

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.password, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: dbConfig.dialect
});



module.exports = sequelize;