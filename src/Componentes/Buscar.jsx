import { useState } from "react";
import Postulacion from "./Postulacion";

export default function Buscar({ vacantes }) {
  const [busqueda, setBusqueda] = useState("");

  const resultados = vacantes.filter((v) =>
    v.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <input style={ { padding: '10px', margin: '10px' } }
        type="text"
        placeholder="Buscar vacante..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
       {resultados.map((v) => (
        <Postulacion key={v.id} vacante={v} />
       
      ))}
    </div>
  );
}
