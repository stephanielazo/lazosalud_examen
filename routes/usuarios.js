const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { verificarAdmin } = require('../middlewares/auth');
const Usuario = require('../models/Usuario');


router.get('/historial', verificarAdmin, async (req, res) => {
  try {
    const pacientes = await Usuario.find({ rol: 'Paciente' });
    res.status(200).json(pacientes);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener pacientes' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { nombre, apellido, email, telefono, rol, password } = req.body;

  try {
    
    const hashPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      email,
      telefono,
      rol,
      password: hashPassword
    });

    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ message: 'Email o contraseña incorrectos' });

    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) return res.status(400).json({ message: 'Email o contraseña incorrectos' });

    res.status(200).json({
      message: 'Login exitoso',
      usuario: {
        _id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuarioActualizado) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
