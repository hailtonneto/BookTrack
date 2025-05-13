const { Livro } = require('../models');

exports.editarLivro = async (req, res) => {
  const livroId = req.params.id;
  const usuarioId = req.user.id; 

  const livro = await Livro.findOne({ where: { id: livroId } });

  if (!livro) {
    return res.status(404).json({ error: "Livro não encontrado" });
  }

  if (livro.usuario_id !== usuarioId) {
    return res.status(403).json({ error: "Acesso negado: você não é o dono deste livro." });
  }

  livro.titulo = req.body.titulo;
  livro.autor = req.body.autor;

  await livro.save();

  res.status(200).json(livro);
};
