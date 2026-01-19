const express = require('express');
const router = express.Router();
const Agendamiento = require('../models/Agendamiento');
const { verificarAdmin } = require('../middlewares/auth');

router.get('/', verificarAdmin, async (req, res) => {
  try {
    const agendamientos = await Agendamiento.find()
      .populate('paciente', 'nombre apellido email')
      .sort({ fecha_hora: 1 }); 
    res.status(200).json(agendamientos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/paciente/:pacienteId', async (req, res) => {
  try {
    const agendamientos = await Agendamiento.find({ paciente: req.params.pacienteId })
      .populate('paciente', 'nombre apellido email')
      .sort({ fecha_hora: 1 });

    res.status(200).json(agendamientos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener agendamientos' });
  }
});


router.post('/', async (req, res) => {
  const { paciente, link_calendly, fecha_hora } = req.body;

  const nuevoAgendamiento = new Agendamiento({
    paciente,
    link_calendly,
    fecha_hora
  });

  try {
    const agendamientoGuardado = await nuevoAgendamiento.save();
    res.status(201).json(agendamientoGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const agendamientoActualizado = await Agendamiento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!agendamientoActualizado) return res.status(404).json({ message: 'Agendamiento no encontrado' });
    res.status(200).json(agendamientoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const agendamientoEliminado = await Agendamiento.findByIdAndDelete(req.params.id);
    if (!agendamientoEliminado) return res.status(404).json({ message: 'Agendamiento no encontrado' });
    res.status(200).json({ message: 'Agendamiento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
