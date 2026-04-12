import ListaVacantes from "../Componentes/ListaVacantes";
import vacantes from "../data/vacantes";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenido 👋</h1>
      <p>Encuentra tu próxima oportunidad laboral</p>

      <h2>Vacantes recientes</h2>
      <ListaVacantes vacantes={vacantes.slice(0, 3)} />

      <button onClick={() => window.location.href = "/vacantes"}>
        Ver todas las vacantes
      </button>
    </div>
  );
}