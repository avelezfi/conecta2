const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

// GET todas las vacantes
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`
        SELECT v.*, e.nombre as nombre_empresa, e.sector
        FROM VACANTE v
        LEFT JOIN EMPRESA e ON v.id_empresa = e.id_empresa
      `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET vacante por id
router.get('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('SELECT * FROM VACANTE WHERE id_vacante = @id');
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST crear vacante
router.post('/', async (req, res) => {
  const { titulo, descripcion, modalidad, id_empresa } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('titulo', sql.VarChar, titulo)
      .input('descripcion', sql.VarChar, descripcion || null)
      .input('modalidad', sql.VarChar, modalidad || null)
      .input('id_empresa', sql.Int, id_empresa)
      .input('fecha_publicacion', sql.Date, new Date()) // ← agrega esta línea
      .query(`INSERT INTO VACANTE (titulo, descripcion, modalidad, id_empresa, fecha_publicacion)
              OUTPUT INSERTED.id_vacante
              VALUES (@titulo, @descripcion, @modalidad, @id_empresa, @fecha_publicacion)`);
    res.json({ ok: true, id: result.recordset[0].id_vacante });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE eliminar vacante
router.delete('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('DELETE FROM VACANTE WHERE id_vacante = @id');
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;