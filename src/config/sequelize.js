const { Sequelize } = require("sequelize");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

console.log(process.env, 'PROCESS ENV');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres", // ou 'mysql', 'sqlite', dependendo do banco usado
  }
);

module.exports = sequelize;
