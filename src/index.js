const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/sequelize");

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Importar rotas
const usuarioRoutes = require("./routes/usuarios");
const livroRoutes = require("./routes/livros"); // Adicione outras rotas conforme necessário

app.use("/usuarios", usuarioRoutes);
app.use("/livros", livroRoutes);

// Configurar porta
const PORT = process.env.PORT || 3000;

// Inicializar o servidor
app.listen(PORT, async () => {
  try {
    console.log("Iniciando conexão com o banco de dados...");

    // Autenticar conexão
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados bem-sucedida!");

    // Sincronizar modelos com o banco
    await sequelize.sync({ alter: true }); // Use `force: true` apenas em desenvolvimento para resetar tabelas
    console.log("Modelos sincronizados com o banco de dados!");

    console.log(`Servidor rodando na porta ${PORT}`);
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados ou iniciar o servidor:", error);
    process.exit(1); // Encerrar o processo em caso de erro crítico
  }
});
