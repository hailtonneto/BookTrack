const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Livro = sequelize.define("Livro", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 100],
    },
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("Quero Ler", "Lendo", "Lido"),
    allowNull: false,
  },
  avaliacao: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5,
    },
  },
  data_conclusao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Livro;
