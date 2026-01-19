const mongoose = require('mongoose');

const ChatbotSchema = new mongoose.Schema({
    pregunta: { type: String, required: true },
    respuesta: { type: String, required: true },
    categoria: { type: String }
});

module.exports = mongoose.model('Chatbot', ChatbotSchema);
