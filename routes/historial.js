const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const { verificarAdmin } = require('../middlewares/auth');

router.get('/pacientes', verificarAdmin, async (req, res) => {
  try {
    const pacientes = await Usuario.find({ rol: 'Paciente' });
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pacientes' });
  }
});

module.exports = router;
