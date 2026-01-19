const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const usuariosRoutes = require('./routes/usuarios');
const agendamientosRoutes = require('./routes/agendamientos');
const profesionalesRoutes = require('./routes/profesionales');
const chatbotRoutes = require('./routes/chatbot');
const mensajesChatRoutes = require('./routes/mensajesChat');
const historialRoutes = require('./routes/historial');

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/agendamientos', agendamientosRoutes);
app.use('/api/profesionales', profesionalesRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/mensajes', mensajesChatRoutes);
app.use('/api/historial', historialRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch(err => console.error('Error conectando a MongoDB', err));

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
