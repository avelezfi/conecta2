import { useState } from "react";

export default function Buscar({ vacantes }) {
  const [busqueda, setBusqueda] = useState("");

  const resultados = vacantes.filter((v) =>
    v.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar vacante..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
}
