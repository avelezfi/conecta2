const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { poolPromise } = require('./db');

const vacantesRouter = require('./routes/vacantes');
const usuariosRouter = require('./routes/usuarios');
const postulacionesRouter = require('./routes/postulaciones');
const estudiantesRouter = require('./routes/estudiantes');
const empresasRouter = require('./routes/empresas');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.json({ ok: true, mensaje: 'Servidor funcionando' });
});

app.use('/api/vacantes', vacantesRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/postulaciones', postulacionesRouter);
app.use('/api/estudiantes', estudiantesRouter);
app.use('/api/empresas', empresasRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});