const express = require('express');
const router = express.Router();
const Profesional = require('../models/Profesional');

router.get('/', async (req, res) => {
    try {
        const profesionales = await Profesional.find();
        res.status(200).json(profesionales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const profesional = await Profesional.findById(req.params.id);
        if (!profesional) return res.status(404).json({ message: 'Profesional no encontrado' });
        res.status(200).json(profesional);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { nombre, apellido, email, telefono, especialidad } = req.body;

    const nuevoProfesional = new Profesional({
        nombre,
        apellido,
        email,
        telefono,
        especialidad
    });

    try {
        const profesionalGuardado = await nuevoProfesional.save();
        res.status(201).json(profesionalGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const profesionalActualizado = await Profesional.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!profesionalActualizado) return res.status(404).json({ message: 'Profesional no encontrado' });
        res.status(200).json(profesionalActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const profesionalEliminado = await Profesional.findByIdAndDelete(req.params.id);
        if (!profesionalEliminado) return res.status(404).json({ message: 'Profesional no encontrado' });
        res.status(200).json({ message: 'Profesional eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
