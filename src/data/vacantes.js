export const vacantes = [
  {
    id: 1,
    titulo: "Desarrollador Frontend",
    empresa: "Tech Solutions",
    ubicacion: "Remoto",
    salario: "$2,500 USD"
  },
  {
    id: 2,
    titulo: "Backend Developer",
    empresa: "CodeCorp",
    ubicacion: "Colombia",
    salario: "$3,000 USD"
  },
  {
    id: 3,
    titulo: "Diseñador UX/UI",
    empresa: "Creative Studio",
    ubicacion: "Medellín",
    salario: "$2,000 USD"
  },
  {
    id: 4,
    titulo: "Ingeniero de Software",
    empresa: "Innovatech",
    ubicacion: "Bogotá",
    salario: "$3,500 USD"
  },
  {
    id: 5,
    titulo: "Analista de Datos",
    empresa: "DataCorp",
    ubicacion: "Remoto",
    salario: "$2,800 USD"
  }
];
const { sql } = require('../db'); // agrega sql al import existente

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
      .query(`INSERT INTO VACANTE (titulo, descripcion, modalidad, id_empresa)
              OUTPUT INSERTED.id_vacante
              VALUES (@titulo, @descripcion, @modalidad, @id_empresa)`);
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
