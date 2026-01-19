const mongoose = require('mongoose');

const MensajeSchema = new mongoose.Schema({
    remitente: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    destinatario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    mensaje: { type: String, required: true },
    fecha_envio: { type: Date, default: Date.now },
    leido: { type: Boolean, default: false }
});

module.exports = mongoose.model('MensajesChat', MensajeSchema);
