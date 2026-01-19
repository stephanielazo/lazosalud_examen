const mongoose = require('mongoose');

const ProfesionalSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    especialidad: { type: String, required: true },
    fecha_registro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profesional', ProfesionalSchema);
