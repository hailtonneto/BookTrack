const express = require("express");
const router = express.Router();
const LivroController = require("../controllers/LivroController");
const verificarToken = require("../middlewares/authMiddleware"); 

router.post("/", LivroController.criar);
router.get("/", LivroController.listar);
router.get("/:id", LivroController.buscarPorId);
router.put("/:id", verificarToken, LivroController.atualizar);
router.delete("/:id", verificarToken, LivroController.deletar);

module.exports = router;
