const Usuario = require("../models/Usuario");

module.exports = {
  async criar(req, res) {
    try {
      const { nome, email } = req.body;
      const usuario = await Usuario.create({ nome, email });
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async listar(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      await usuario.update({ nome, email });
      res.status(200).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      await usuario.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
