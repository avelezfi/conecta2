const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { sql, poolPromise } = require('../db');
const authenticateToken = require('../middleware/auth');

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


     // Validar que correo y contraseña no estén vacíos
    if (!correo || !contrasena) {
    return res.status(400).json({ 
      error: 'Correo y contraseña son requeridos' 
    });
    }
      // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
    return res.status(400).json({ 
      error: 'Formato de correo inválido' 
    });
    }
    

    const usuario = result.recordset[0];
    const passwordMatches = bcrypt.compareSync(contrasena, usuario.contrasena);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }
    const token = jwt.sign({ id: usuario.id_usuario, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ ok: true, token, usuario: result.recordset[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET mi perfil
router.get('/mi-perfil', authenticateToken, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, req.user.id)
      .query('SELECT * FROM USUARIO WHERE id_usuario = @id');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json({ ok: true, usuario: result.recordset[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST registro
router.post('/registro', [
   body('correo')
   .isEmail()
   .normalizeEmail()
   .withMessage('Correo inválido'),
   body('contrasena')
   .isLength({ min: 6 })
   .withMessage('Contraseña debe tener al menos 6 caracteres'),
], async (req, res) => {
  const { correo, contrasena, rol, id_estudiante, id_empresa } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const hashedPassword = bcrypt.hashSync(contrasena, 10);
    const pool = await poolPromise;
    
    // Insertar usuario y obtener el ID generado
    const insertResult = await pool.request()
      .input('correo', sql.VarChar, correo)
      .input('contrasena', sql.VarChar, hashedPassword)
      .input('rol', sql.VarChar, rol)
      .input('fecha_registro', sql.Date, new Date())
      .input('id_estudiante', sql.Int, id_estudiante || null)
      .input('id_empresa', sql.Int, id_empresa || null)
      .query(`INSERT INTO USUARIO (correo, contrasena, rol, fecha_registro, id_estudiante, id_empresa)
              OUTPUT INSERTED.id_usuario, INSERTED.correo, INSERTED.rol
              VALUES (@correo, @contrasena, @rol, @fecha_registro, @id_estudiante, @id_empresa)`);
    
    const nuevoUsuario = insertResult.recordset[0];
    
    // Generar token JWT
    const token = jwt.sign(
      { id: nuevoUsuario.id_usuario, correo: nuevoUsuario.correo, rol: nuevoUsuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );
    
    res.json({ 
      ok: true, 
      mensaje: 'Usuario registrado exitosamente',
      token,
      usuario: nuevoUsuario
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;