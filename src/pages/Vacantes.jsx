import { useState } from "react";

const vacantesData = [
  { id: 1, cargo: "Desarrollador Frontend", empresa: "Tech Solutions", ciudad: "Medellín", modalidad: "Remoto", area: "Tecnología" },
  { id: 2, cargo: "Backend Developer", empresa: "CodeCorp", ciudad: "Bogotá", modalidad: "Presencial", area: "Tecnología" },
  { id: 3, cargo: "Diseñador UX/UI", empresa: "Creative Studio", ciudad: "Cali", modalidad: "Híbrido", area: "Diseño" },
  { id: 4, cargo: "Ingeniero de Software", empresa: "Innovatech", ciudad: "Medellín", modalidad: "Remoto", area: "Tecnología" },
  { id: 5, cargo: "Analista de Datos", empresa: "DataCorp", ciudad: "Barranquilla", modalidad: "Presencial", area: "Datos" },
  { id: 6, cargo: "Marketing Digital", empresa: "BrandUp", ciudad: "Bogotá", modalidad: "Híbrido", area: "Marketing" },
];

const coloresModalidad = {
  "Remoto": { bg: "#e0f2f1", color: "#00695c" },
  "Presencial": { bg: "#fff3e0", color: "#e65100" },
  "Híbrido": { bg: "#f3e5f5", color: "#6a1b9a" },
};

export default function Vacantes({ usuarioActivo }) {
  const [busqueda, setBusqueda] = useState("");
  const [postuladas, setPostuladas] = useState([]);

  const vacantesFiltradas = vacantesData.filter((v) =>
    v.cargo.toLowerCase().includes(busqueda.toLowerCase()) ||
    v.empresa.toLowerCase().includes(busqueda.toLowerCase()) ||
    v.ciudad.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handlePostular = (id) => {
    if (!usuarioActivo) {
      alert("Debes iniciar sesión para postularte");
      return;
    }
    if (postuladas.includes(id)) {
      alert("Ya te postulaste a esta vacante");
      return;
    }
    setPostuladas([...postuladas, id]);
    alert("¡Postulación enviada con éxito! ✅");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>

      {/* Encabezado */}
      <h2 style={{ textAlign: "center", color: "#00695c", marginBottom: "0.5rem" }}>
        Vacantes Disponibles
      </h2>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "2rem" }}>
        Encuentra la oportunidad perfecta para ti
      </p>

      {/* Buscador */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Buscar por cargo, empresa o ciudad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "12px 16px",
            fontSize: "15px",
            borderRadius: "30px",
            border: "2px solid #00897b",
            outline: "none",
          }}
        />
      </div>

      {/* Contador */}
      <p style={{ color: "#666", marginBottom: "1rem", fontSize: "14px" }}>
        {vacantesFiltradas.length} vacante(s) encontrada(s)
      </p>

      {/* Grid de tarjetas */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1.5rem",
      }}>
        {vacantesFiltradas.map((v) => (
          <div key={v.id} style={{
            background: "white",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            borderTop: "4px solid #00897b",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}>
            {/* Cargo */}
            <h3 style={{ color: "#00695c", margin: 0, fontSize: "18px" }}>
              {v.cargo}
            </h3>

            {/* Empresa */}
            <p style={{ color: "#444", margin: 0, fontSize: "14px" }}>
               {v.empresa}
            </p>

            {/* Ciudad */}
            <p style={{ color: "#666", margin: 0, fontSize: "14px" }}>
               {v.ciudad}
            </p>

            {/* Area */}
            <p style={{ color: "#666", margin: 0, fontSize: "14px" }}>
               {v.area}
            </p>

            {/* Modalidad badge */}
            <span style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
              width: "fit-content",
              background: coloresModalidad[v.modalidad]?.bg,
              color: coloresModalidad[v.modalidad]?.color,
            }}>
              {v.modalidad}
            </span>

            {/* Botón postular */}
            <button
              onClick={() => handlePostular(v.id)}
              style={{
                marginTop: "0.5rem",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                background: postuladas.includes(v.id) ? "#b2dfdb" : "#00897b",
                color: postuladas.includes(v.id) ? "#00695c" : "white",
                transition: "background 0.2s",
              }}
            >
              {postuladas.includes(v.id) ? "✅ Postulado" : "Postularme ahora"}
            </button>
          </div>
        ))}
      </div>

      {vacantesFiltradas.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#999" }}>
          <p style={{ fontSize: "18px" }}>No se encontraron vacantes</p>
          <p>Intenta con otro término de búsqueda</p>
        </div>
      )}
    </div>
  );
}