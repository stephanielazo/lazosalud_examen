const mongoose = require('mongoose');

const AgendamientoSchema = new mongoose.Schema({
    paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    link_calendly: { type: String, required: true }, 
    fecha_hora: { type: Date, required: true }, 
    fecha_registro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Agendamiento', AgendamientoSchema);
