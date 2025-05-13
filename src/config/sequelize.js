const { Sequelize } = require("sequelize");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nome do banco
  process.env.DB_USER,     // Usuário do banco
  process.env.DB_PASSWORD, // Senha do banco
  {
    host: process.env.DB_HOST,   // Host do banco (ex.: localhost)
    port: process.env.DB_PORT,   // Porta do banco (ex.: 5432)
    dialect: "postgres",         // Dialeto para PostgreSQL
    logging: console.log,        // Mostra as queries no console
  }
);

module.exports = sequelize;