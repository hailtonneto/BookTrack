const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");

router.post("/", UsuarioController.criar);
router.get("/", UsuarioController.listar);
router.get("/:id", UsuarioController.buscarPorId);
router.put("/:id", UsuarioController.atualizar);
router.delete("/:id", UsuarioController.deletar);

router.post("/login", UsuarioController.login);

module.exports = router;
