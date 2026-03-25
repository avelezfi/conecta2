export default function ListaVacantes({ vacantes }) {
  return (
    <div>
      {vacantes.map((v) => (
        <div key={v.id}>
          <h3>{v.titulo}</h3>
          <p>{v.empresa}</p>
        </div>
      ))}
    </div>
  );
}
