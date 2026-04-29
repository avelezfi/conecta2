const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db');

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
      .input('id', req.params.id)
      .query('SELECT * FROM VACANTE WHERE id_vacante = @id');
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;