export default function ListaVacantes({ Vacantes }) {
  return (
    <div>
      {Vacantes.map((v) => (
        <div key={v.id}>
          <h3>{v.titulo}</h3>
          <p>{v.empresa}</p>
        </div>
      ))}
    </div>
  );
}
