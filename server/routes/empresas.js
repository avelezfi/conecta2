const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

// GET todas las empresas
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT * FROM EMPRESA');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET empresa por id
router.get('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('SELECT * FROM EMPRESA WHERE id_empresa = @id');
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST crear empresa
router.post('/', async (req, res) => {
  const { nombre, nit, sector, correo_contacto, descripcion } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('nit', sql.VarChar, nit)
      .input('sector', sql.VarChar, sector || null)
      .input('correo_contacto', sql.VarChar, correo_contacto || null)
      .input('descripcion', sql.VarChar, descripcion || null)
      .query(`INSERT INTO EMPRESA (nombre, nit, sector, correo_contacto, descripcion)
              OUTPUT INSERTED.id_empresa
              VALUES (@nombre, @nit, @sector, @correo_contacto, @descripcion)`);
    res.json({ ok: true, id: result.recordset[0].id_empresa });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT actualizar empresa
router.put('/:id', async (req, res) => {
  const { nombre, sector, descripcion } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, req.params.id)
      .input('nombre', sql.VarChar, nombre)
      .input('sector', sql.VarChar, sector || null)
      .input('descripcion', sql.VarChar, descripcion || null)
      .query(`UPDATE EMPRESA SET nombre=@nombre, sector=@sector, descripcion=@descripcion
              WHERE id_empresa=@id`);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;