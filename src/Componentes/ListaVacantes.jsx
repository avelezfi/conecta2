import ListaVacantes from "../Componentes/ListaVacantes";
import { vacantes } from "../data/vacantes";

export default function Vacantes() {
  return (
  <div>
      <h2>Vacantes</h2>
      <ListaVacantes vacantes={vacantes} />
  </div>
  )
}
