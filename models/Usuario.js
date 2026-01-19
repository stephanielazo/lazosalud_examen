const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    rol: { type: String, enum: ['Paciente', 'Psicologo', 'Administrador'], required: true },
    password: { type: String, required: true },
    fecha_registro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
