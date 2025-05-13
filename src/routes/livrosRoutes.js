const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware'); 
const livrosController = require('../controllers/livrosController');

router.put('/livros/:id', verificarToken, livrosController.editarLivro); 

module.exports = router;
