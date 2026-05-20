import { useState, useEffect } from "react";

function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/empresas")
      .then(res => res.json())
      .then(data => {
        setEmpresas(data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

  const empresasFiltradas = empresas.filter((e) =>
    e.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    e.sector?.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) return <p style={{ padding: "2rem" }}>Cargando empresas...</p>;

  return (
    <div className="contenedor">
      <h2>Empresas registradas</h2>

      <input
        type="text"
        placeholder="Buscar por nombre o sector..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1.5rem" }}
      />

      {empresasFiltradas.length === 0 && (
        <p>No se encontraron empresas.</p>
      )}

      <div className="grid-2">
        {empresasFiltradas.map((empresa) => (
          <div key={empresa.id_empresa} className="seccion" style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem"
          }}>
            <h3 style={{ color: "#00695c", marginBottom: "0.5rem" }}>
              {empresa.nombre}
            </h3>
            <p><strong>NIT:</strong> {empresa.nit}</p>
            <p><strong>Sector:</strong> {empresa.sector}</p>
            <p><strong>Contacto:</strong> {empresa.correo_contacto}</p>
            {empresa.descripcion && (
              <p style={{ marginTop: "0.5rem", color: "#555" }}>
                {empresa.descripcion}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Empresas;