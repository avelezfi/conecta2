const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

// POST login
router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;
  console.log('Datos recibidos:', { correo, contrasena }); 
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('correo', sql.VarChar, correo)
      .input('contrasena', sql.VarChar, contrasena)
      .query('SELECT * FROM USUARIO WHERE correo = @correo AND contrasena = @contrasena');
    
    if (result.recordset.length === 0) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }
    res.json({ ok: true, usuario: result.recordset[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST registro
router.post('/registro', async (req, res) => {
  const { correo, contrasena, rol, id_estudiante, id_empresa } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('correo', sql.VarChar, correo)
      .input('contrasena', sql.VarChar, contrasena)
      .input('rol', sql.VarChar, rol)
      .input('fecha_registro', sql.Date, new Date())
      .input('id_estudiante', sql.Int, id_estudiante || null)
      .input('id_empresa', sql.Int, id_empresa || null)
      .query(`INSERT INTO USUARIO (correo, contrasena, rol, fecha_registro, id_estudiante, id_empresa)
              VALUES (@correo, @contrasena, @rol, @fecha_registro, @id_estudiante, @id_empresa)`);
    res.json({ ok: true, mensaje: 'Usuario registrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;