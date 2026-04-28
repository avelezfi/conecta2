const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

// GET postulaciones de un estudiante
router.get('/estudiante/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query(`
        SELECT p.*, v.titulo, v.modalidad, e.nombre as empresa
        FROM POSTULACION p
        JOIN VACANTE v ON p.id_vacante = v.id_vacante
        JOIN EMPRESA e ON v.id_empresa = e.id_empresa
        WHERE p.id_estudiante = @id
      `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST nueva postulacion
router.post('/', async (req, res) => {
  const { id_estudiante, id_vacante } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id_estudiante', sql.Int, id_estudiante)
      .input('id_vacante', sql.Int, id_vacante)
      .input('fecha', sql.Date, new Date())
      .input('estado', sql.VarChar, 'pendiente')
      .query(`INSERT INTO POSTULACION (id_estudiante, id_vacante, fecha, estado)
              VALUES (@id_estudiante, @id_vacante, @fecha, @estado)`);
    res.json({ ok: true, mensaje: 'Postulación enviada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;