import { useState, useEffect } from "react";

const coloresModalidad = {
  "Remoto": { bg: "#e0f2f1", color: "#00695c" },
  "Presencial": { bg: "#fff3e0", color: "#e65100" },
"Híbrido": { bg: "#e8f4fd", color: "#1565c0" },
"Hibrida": { bg: "#e8f4fd", color: "#1565c0" },
"Hibrido": { bg: "#e8f4fd", color: "#1565c0" },



};

export default function Vacantes({ usuarioActivo }) {
  const [vacantesData, setVacantesData] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [postuladas, setPostuladas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/vacantes")
      .then(res => res.json())
      .then(data => {
        setVacantesData(data);
        setCargando(false);
      })
      .catch(err => {
        setError("No se pudieron cargar las vacantes");
        setCargando(false);
      });

  // Cargar postulaciones previas si hay usuario activo
  if (usuarioActivo?.id_estudiante) {
    fetch(`http://localhost:3001/api/postulaciones/estudiante/${usuarioActivo.id_estudiante}`)
      .then(res => res.json())
      .then(data => {
        const idsPostulados = data.map(p => p.id_vacante);
        setPostuladas(idsPostulados);
      })
      .catch(() => {});
  }
}, []);




  const vacantesFiltradas = vacantesData.filter((v) =>
    v.titulo?.toLowerCase().includes(busqueda.toLowerCase()) ||
    v.nombre_empresa?.toLowerCase().includes(busqueda.toLowerCase()) ||
    v.modalidad?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handlePostular = async (id) => {
    if (!usuarioActivo) {
      alert("Debes iniciar sesión para postularte");
      return;
    }
    if (postuladas.includes(id)) return;

    try {
      const res = await fetch("http://localhost:3001/api/postulaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_estudiante: usuarioActivo.id_estudiante,
          id_vacante: id
        })
      });
      const data = await res.json();
      if (data.ok) {
        setPostuladas([...postuladas, id]);
        alert("¡Postulación enviada!");
      }
    } catch (err) {
      alert("Error al postularse");
    }
  };

  if (cargando) return <p style={{ padding: "2rem" }}>Cargando vacantes...</p>;
  if (error) return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Vacantes disponibles</h2>
      <input
        type="text"
        placeholder="Buscar por cargo, empresa o modalidad..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />
      {vacantesFiltradas.map((v) => (
        <div key={v.id_vacante} style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "1rem"
        }}>
          <h3>{v.titulo}</h3>
          <p><strong>Empresa:</strong> {v.nombre_empresa}</p>
          <p><strong>Sector:</strong> {v.sector}</p>
          <p><strong>Descripción:</strong> {v.descripcion}</p>
          <span style={{
            ...coloresModalidad[v.modalidad],
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "13px"
          }}>
            {v.modalidad}
          </span>
          <br /><br />
          <button
            onClick={() => handlePostular(v.id_vacante)}
            disabled={postuladas.includes(v.id_vacante)}
          >
            {postuladas.includes(v.id_vacante) ? "✅ Postulado" : "Postularme"}
          </button>
        </div>
      ))}
      {vacantesFiltradas.length === 0 && (
        <p>No se encontraron vacantes.</p>
      )}
    </div>
  );
}