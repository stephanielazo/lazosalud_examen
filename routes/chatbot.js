const express = require('express');
const router = express.Router();
const Chatbot = require('../models/Chatbot');


router.post('/', async (req, res) => {
    const { mensaje } = req.body;

    try {
        const respuestaChat = await Chatbot.findOne({ pregunta: mensaje });

        if (respuestaChat) {
            return res.json({ respuesta: respuestaChat.respuesta });
        } else {
            return res.json({ respuesta: "No entendí tu mensaje, pero estoy aquí para escucharte." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
