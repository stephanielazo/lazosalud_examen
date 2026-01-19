const express = require('express');
const router = express.Router();
const MensajesChat = require('../models/MensajesChat');


router.post('/', async (req, res) => {
    const { remitente, destinatario, mensaje } = req.body;

    const nuevoMensaje = new MensajesChat({
        remitente,
        destinatario,
        mensaje
    });

    try {
        const mensajeGuardado = await nuevoMensaje.save();
        res.status(201).json(mensajeGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/', async (req, res) => {
    const { usuario1, usuario2 } = req.query;

    try {
        const mensajes = await MensajesChat.find({
            $or: [
                { remitente: usuario1, destinatario: usuario2 },
                { remitente: usuario2, destinatario: usuario1 }
            ]
        })
        .sort({ fecha_envio: 1 }); 
        res.status(200).json(mensajes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/:id/leido', async (req, res) => {
    try {
        const mensajeActualizado = await MensajesChat.findByIdAndUpdate(
            req.params.id,
            { leido: true },
            { new: true }
        );
        if (!mensajeActualizado) return res.status(404).json({ message: 'Mensaje no encontrado' });
        res.status(200).json(mensajeActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const mensajeEliminado = await MensajesChat.findByIdAndDelete(req.params.id);
        if (!mensajeEliminado) return res.status(404).json({ message: 'Mensaje no encontrado' });
        res.status(200).json({ message: 'Mensaje eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
