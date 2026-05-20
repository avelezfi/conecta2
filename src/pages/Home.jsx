import ListaVacantes from "../Componentes/ListaVacantes";
import vacantes from "../data/vacantes";


export default function Home() {
  return (
    <div className="home">
     
      <section className="hero">
        <img src={logo} alt="Conecta2 logo" className="logo" />

        <h1>Conecta talento con oportunidades laborales</h1>

        <p>
          Conecta2 es una plataforma de bolsa de empleo diseñada para facilitar la
          conexión entre candidatos y empresas, optimizando el proceso de búsqueda
          y publicación de ofertas laborales de manera eficiente, segura y moderna.
        </p>
      </section>

      <section className="info">
        <div>
          <h3>Para candidatos</h3>
          <p>
            Facilita la búsqueda de empleo y la conexión con empresas que se
            ajustan a tu perfil profesional.
          </p>
        </div>

        <div>
          <h3>Para empresas</h3>
          <p>
            Permite publicar vacantes y encontrar talento calificado de forma
            rápida y organizada.
          </p>
        </div>

        <div>
          <h3>Plataforma</h3>
          <p>
            Sistema moderno, seguro y diseñado para mejorar la empleabilidad y la
            gestión de talento.
          </p>
        </div>
      </section>
    </div>
  );
}