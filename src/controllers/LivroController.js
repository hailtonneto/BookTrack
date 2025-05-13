const Livro = require("../models/Livro");

module.exports = {
  async criar(req, res) {
    const { titulo, autor, status, avaliacao, usuario_id } = req.body;

    try {
      // Validação: Avaliação só pode existir se o status for "Lido"
      if (avaliacao !== undefined && status !== "Lido") {
        return res.status(400).json({ error: "Avaliação só pode ser registrada se o status for 'Lido'." });
      }

      // Validação: Avaliação deve ser entre 1 e 5 se o status for "Lido"
      if (status === "Lido" && (!avaliacao || avaliacao < 1 || avaliacao > 5)) {
        return res.status(400).json({ error: "Avaliação deve ser entre 1 e 5 quando o status for 'Lido'." });
      }

      // Determinar data de conclusão
      const dataConclusao = status === "Lido" ? new Date() : null;

      // Criação do livro
      const novoLivro = await Livro.create({
        titulo,
        autor,
        status,
        avaliacao: status === "Lido" ? avaliacao : null, // Garantir que avaliação é nula para outros status
        data_conclusao: dataConclusao,
        usuario_id,
      });

      res.status(201).json(novoLivro);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async listar(req, res) {
    try {
      const livros = await Livro.findAll();
      res.status(200).json(livros);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async buscarPorId(req, res) {
    const { id } = req.params;

    try {
      const livro = await Livro.findByPk(id);

      if (!livro) {
        return res.status(404).json({ error: "Livro não encontrado." });
      }

      res.status(200).json(livro);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { titulo, autor, status, avaliacao } = req.body;

    try {
      const livro = await Livro.findByPk(id);

      if (!livro) {
        return res.status(404).json({ error: "Livro não encontrado." });
      }

      if (livro.status === "Lido") {
        return res.status(400).json({ error: "Livros com status 'Lido' não podem ser editados." });
      }

      if (status === "Lido" && (!avaliacao || avaliacao < 1 || avaliacao > 5)) {
        return res.status(400).json({ error: "Avaliação deve ser entre 1 e 5 quando o status for 'Lido'." });
      }

      const dataConclusao = status === "Lido" ? new Date() : null;

      await livro.update({
        titulo,
        autor,
        status,
        avaliacao,
        data_conclusao: dataConclusao,
      });

      res.status(200).json(livro);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deletar(req, res) {
    const { id } = req.params;

    try {
      const livro = await Livro.findByPk(id);

      if (!livro) {
        return res.status(404).json({ error: "Livro não encontrado." });
      }

      await livro.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
