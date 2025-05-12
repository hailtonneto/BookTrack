const express = require("express");
const app = express();
const sequelize = require("./config/sequelize");
const usuarioRoutes = require("./routes/usuarios");

require('dotenv').config();

app.use(express.json());
app.use("/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados bem-sucedida!");
    await sequelize.sync({ force: false });
    console.log(`Servidor rodando na porta ${PORT}`);
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
  }
});
