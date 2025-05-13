const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');  

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await User.findOne({ where: { email } });

  if (!usuario) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    return res.status(401).json({ error: "Senha incorreta" });
  }

  const token = jwt.sign({ id: usuario.id }, 'segredo', { expiresIn: '1h' });

  res.json({ token });
};
