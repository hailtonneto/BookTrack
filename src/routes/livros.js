const express = require("express");
const router = express.Router();
const LivroController = require("../controllers/LivroController");

// CRUD de Livros
router.post("/", LivroController.criar);
router.get("/", LivroController.listar);
router.get("/:id", LivroController.buscarPorId);
router.put("/:id", LivroController.atualizar);
router.delete("/:id", LivroController.deletar);

module.exports = router;
