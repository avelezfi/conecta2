import { useState, useEffect } from "react";

const coloresEstado = {
  "pendiente":   { bg: "#fff3e0", color: "#e65100" },
  "En revisión": { bg: "#e3f2fd", color: "#1565c0" },
  "aprobado":    { bg: "#e8f5e9", color: "#2e7d32" },
  "rechazado":   { bg: "#ffebee", color: "#c62828" },
  "Contratado":  { bg: "#e8f5e9", color: "#2e7d32" },
};

function Seguimiento({ usuarioActivo }) {
  const [postulaciones, setPostulaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!usuarioActivo || !usuarioActivo.id_estudiante) {
      setCargando(false);
      return;
    }

    fetch(`http://localhost:3001/api/postulaciones/estudiante/${usuarioActivo.id_estudiante}`)
      .then(res => res.json())
      .then(data => {
        setPostulaciones(data);
        setCargando(false);
      })
      .catch(() => {
        setError("No se pudieron cargar las postulaciones");
        setCargando(false);
      });
  }, [usuarioActivo]);

  if (!usuarioActivo) {
    return (
      <div className="contenedor">
        <h2>Mis Postulaciones</h2>
        <p style={{ textAlign: "center" }}>Debes iniciar sesión para ver tus postulaciones.</p>
      </div>
    );
  }

  if (cargando) return <div className="contenedor"><p>Cargando postulaciones...</p></div>;
  if (error) return <div className="contenedor"><p style={{ color: "red" }}>{error}</p></div>;

  return (
    <div className="contenedor">
      <h2>Mis Postulaciones</h2>

      {postulaciones.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          Aún no te has postulado a ninguna vacante.
        </p>
      ) : (
        <div>
          {postulaciones.map((p) => {
            const estilo = coloresEstado[p.estado] || { bg: "#f5f5f5", color: "#333" };
            return (
              <div key={p.id_postulacion} style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <h3 style={{ color: "#00695c", margin: "0 0 4px" }}>{p.titulo}</h3>
                  <p style={{ margin: "0", color: "#555" }}>
                    <strong>Empresa:</strong> {p.empresa}
                  </p>
                  <p style={{ margin: "4px 0 0", color: "#888", fontSize: "13px" }}>
                    <strong>Fecha:</strong> {new Date(p.fecha).toLocaleDateString("es-CO")}
                  </p>
                </div>
                <span style={{
                  background: estilo.bg,
                  color: estilo.color,
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: "500",
                  whiteSpace: "nowrap"
                }}>
                  {p.estado}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Seguimiento;