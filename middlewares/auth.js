const Usuario = require('../models/Usuario');

async function verificarAdmin(req, res, next) {
  const userId = req.header('x-user-id');

  if (!userId) return res.status(401).json({ message: 'No autorizado' });

  try {
    const usuario = await Usuario.findById(userId);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (usuario.rol !== 'Administrador') {
      return res.status(403).json({ message: 'Acceso denegado: solo administradores' });
    }

    req.usuario = usuario;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

module.exports = { verificarAdmin };
