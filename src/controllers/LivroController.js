const pool = require("../config/database");

module.exports = {
  async criar(req, res) {
    const { titulo, autor, status, avaliacao, usuario_id } = req.body;

    try {
      if (status === "Lido" && (!avaliacao || avaliacao < 1 || avaliacao > 5)) {
        return res.status(400).json({ error: "Avaliação deve ser entre 1 e 5 quando o status for 'Lido'." });
      }

      const dataConclusao = status === "Lido" ? new Date() : null;

      const result = await pool.query(
        `INSERT INTO livros (titulo, autor, status, avaliacao, data_conclusao, usuario_id) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [titulo, autor, status, avaliacao, dataConclusao, usuario_id]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async listar(req, res) {
    try {
      const result = await pool.query("SELECT * FROM livros");
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async buscarPorId(req, res) {
    const { id } = req.params;

    try {
      const result = await pool.query("SELECT * FROM livros WHERE id = $1", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Livro não encontrado." });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { titulo, autor, status, avaliacao } = req.body;

    try {
      const livro = await pool.query("SELECT * FROM livros WHERE id = $1", [id]);

      if (livro.rows.length === 0) {
        return res.status(404).json({ error: "Livro não encontrado." });
      }

      if (livro.rows[0].status === "Lido") {
        return res.status(400).json({ error: "Livros com status 'Lido' não podem ser editados." });
      }

      if (status === "Lido" && (!avaliacao || avaliacao < 1 || avaliacao > 5)) {
        return res.status(400).json({ error: "Avaliação deve ser entre 1 e 5 quando o status for 'Lido'." });
      }

      const dataConclusao = status === "Lido" ? new Date() : null;

      const result = await pool.query(
        `UPDATE livros 
         SET titulo = $1, autor = $2, status = $3, avaliacao = $4, data_conclusao = $5 
         WHERE id = $6 RETURNING *`,
        [titulo, autor, status, avaliacao, dataConclusao, id]
      );

      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deletar(req, res) {
    const { id } = req.params;

    try {
      const livro = await pool.query("SELECT * FROM livros WHERE id = $1", [id]);

      if (livro.rows.length === 0) {
        return res.status(404).json({ error: "Livro não encontrado." });
      }

      await pool.query("DELETE FROM livros WHERE id = $1", [id]);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
