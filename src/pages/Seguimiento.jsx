import React from 'react';

const Seguimiento = () => {
  // Datos simulados de postulaciones del usuario
  const misPostulaciones = [
    { id: 1, cargo: 'Desarrollador Frontend', estado: 'Contratado' },
    { id: 2, cargo: 'Analista de Datos', estado: 'En revisión' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Mis Postulaciones (Seguimiento de Estado)</h2>
      <ul>
        {misPostulaciones.map((p) => (
          <li key={p.id}>
            {p.cargo} - <strong>{p.estado}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Seguimiento;
