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

      {resultados.map((v) => (
        <div key={v.id}>
          <h3>{v.titulo}</h3>
          <p>{v.empresa}</p>
        </div>
      ))}
    </div>
  );
}
