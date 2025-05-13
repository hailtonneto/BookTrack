const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/sequelize");
const verificarToken = require("./middlewares/authMiddleware"); 

dotenv.config();

const app = express();

app.use(express.json());

const usuarioRoutes = require("./routes/usuarios");
const livroRoutes = require("./routes/livros"); 

app.use("/usuarios", usuarioRoutes);
app.use("/livros", verificarToken, livroRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    console.log("Iniciando conexão com o banco de dados...");

    await sequelize.authenticate();
    console.log("Conexão com o banco de dados bem-sucedida!");

    await sequelize.sync({ alter: true }); 
    console.log("Modelos sincronizados com o banco de dados!");

    console.log(`Servidor rodando na porta ${PORT}`);
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados ou iniciar o servidor:", error);
    process.exit(1); 
  }
});
