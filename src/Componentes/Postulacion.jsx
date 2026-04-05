import { useState } from 'react';

const Postulacion = ({ vacante }) => {
  const [estado, setEstado] = useState('Nuevo');
  const [postulado, setPostulado] = useState(false);

  const manejarPostulacion = () => {
    setPostulado(true);
    setEstado('En revisión');
    alert(`Te has postulado a: ${vacante.titulo}`);
  };

  return (
    <div style={estiloCard}>
      <h3>{vacante.titulo}</h3>
      <p>Empresa: {vacante.empresa}</p>
      
      {/* Botón con evento onClick */}
      {!postulado ? (
        <button onClick={manejarPostulacion} style={botonEstilo}>
          Postularme ahora
        </button>
      ) : (
        <div style={statusBadge}>
          <strong>Estado:</strong> {estado}
        </div>
      )}
    </div>
  );
};

const estiloCard = { border: '1px solid #ccc', padding: '15px', borderRadius: '8px', margin: '10px' };
const botonEstilo = { backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' };
const statusBadge = { color: '#28a745', fontWeight: 'bold' };

export default Postulacion;