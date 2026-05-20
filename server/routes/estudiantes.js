const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

// POST crear estudiante
router.post('/', async (req, res) => {
  const { nombre, apellido, correo, telefono, programa, semestre } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('apellido', sql.VarChar, apellido)
      .input('correo', sql.VarChar, correo)
      .input('telefono', sql.VarChar, telefono || null)
      .input('programa', sql.VarChar, programa || null)
      .input('semestre', sql.Int, semestre || 1)
      .query(`INSERT INTO ESTUDIANTE (nombre, apellido, correo, telefono, programa, semestre)
              OUTPUT INSERTED.id_estudiante
              VALUES (@nombre, @apellido, @correo, @telefono, @programa, @semestre)`);
    res.json({ ok: true, id: result.recordset[0].id_estudiante });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET estudiante por id
router.get('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('SELECT * FROM ESTUDIANTE WHERE id_estudiante = @id');
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT actualizar estudiante
router.put('/:id', async (req, res) => {
  const { nombre, apellido, telefono, programa, semestre } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, req.params.id)
      .input('nombre', sql.VarChar, nombre)
      .input('apellido', sql.VarChar, apellido)
      .input('telefono', sql.VarChar, telefono || null)
      .input('programa', sql.VarChar, programa || null)
      .input('semestre', sql.Int, semestre || 1)
      .query(`UPDATE ESTUDIANTE SET nombre=@nombre, apellido=@apellido,
              telefono=@telefono, programa=@programa, semestre=@semestre
              WHERE id_estudiante=@id`);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;