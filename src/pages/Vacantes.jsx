
import { vacantes } from "../data/vacantes";
import Postulacion from "../Componentes/Postulacion";
import Buscar from "../Componentes/Buscar";

export default function Vacantes() {
  return (
  <div style = {container}>
      <h2>Vacantes</h2>
    <Buscar vacantes={vacantes} />
    {vacantes.map((v) => (
     <Postulacion key={v.id} vacante={v} />
      ))}
  </div>
  );
}


const container = { border: '1px solid #ccc', padding: '15px', borderRadius: '8px', margin: '10px' };
