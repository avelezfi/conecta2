import { useState } from "react";

function Perfil({ usuarioActivo, estudiantes, actualizarEstudiantes, actualizarUsuarioActivo, cerrarSesion, setPagina }) {
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});

  if (!usuarioActivo) {
    return (
      <div className="contenedor">
        <h2>Perfil de Usuario</h2>
        <p style={{ textAlign: "center" }}>Debes iniciar sesión para ver tu perfil.</p>
      </div>
    );
  }

  const handleEditar = () => { setForm({ ...usuarioActivo }); setEditando(true); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGuardar = () => {
    const actualizados = estudiantes.map((u) => u.id === usuarioActivo.id ? form : u);
    actualizarEstudiantes(actualizados);
    actualizarUsuarioActivo(form, "estudiante");
    setEditando(false);
    alert("Perfil guardado ✅");
  };

  const handleEliminar = () => {
    if (window.confirm("¿Eliminar perfil?")) {
      actualizarEstudiantes(estudiantes.filter((u) => u.id !== usuarioActivo.id));
      cerrarSesion();
      setPagina("home");
    }
  };

  return (
    <div className="contenedor">
      <h2>Perfil de Usuario</h2>

      {!editando ? (
        <>
          <div className="seccion">
            <h4> Información Personal</h4>
            <table className="tabla-perfil">
              <tbody>
                <tr><td>Nombre</td><td>{usuarioActivo.nombre}</td></tr>
                <tr><td>Correo</td><td>{usuarioActivo.email}</td></tr>
                <tr><td>Teléfono</td><td>{usuarioActivo.telefono}</td></tr>
                <tr><td>Ciudad</td><td>{usuarioActivo.ciudad}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="seccion">
            <h4> Información Académica</h4>
            <table className="tabla-perfil">
              <tbody>
                <tr><td>Programa</td><td>{usuarioActivo.programa}</td></tr>
                <tr><td>Semestre</td><td>{usuarioActivo.semestre}</td></tr>
                <tr><td>Institución</td><td>{usuarioActivo.institucion}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="seccion">
            <h4> Información Laboral</h4>
            <table className="tabla-perfil">
              <tbody>
                <tr><td>Cargo deseado</td><td>{usuarioActivo.cargoDeseado}</td></tr>
                <tr><td>Empresa actual</td><td>{usuarioActivo.empresaActual}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="botones">
            <button className="btn-primary" onClick={handleEditar}>Editar</button>
            <button className="btn-danger" onClick={handleEliminar}>Eliminar perfil</button>
            <button className="btn-secondary" onClick={() => { cerrarSesion(); setPagina("home"); }}>Cerrar sesión</button>
          </div>
        </>
      ) : (
        <>
          <div className="seccion">
            <h4> Información Personal</h4>
            <div className="grid-2">
              <label className="campo">Nombre<input name="nombre" value={form.nombre || ""} onChange={handleChange} /></label>
              <label className="campo">Teléfono<input name="telefono" value={form.telefono || ""} onChange={handleChange} /></label>
              <label className="campo">Ciudad<input name="ciudad" value={form.ciudad || ""} onChange={handleChange} /></label>
            </div>
          </div>
          <div className="seccion">
            <h4> Información Académica</h4>
            <div className="grid-2">
              <label className="campo">Programa<input name="programa" value={form.programa || ""} onChange={handleChange} /></label>
              <label className="campo">Semestre<input name="semestre" value={form.semestre || ""} onChange={handleChange} /></label>
              <label className="campo">Institución<input name="institucion" value={form.institucion || ""} onChange={handleChange} /></label>
            </div>
          </div>
          <div className="seccion">
            <h4> Información Laboral</h4>
            <div className="grid-2">
              <label className="campo">Cargo deseado<input name="cargoDeseado" value={form.cargoDeseado || ""} onChange={handleChange} /></label>
              <label className="campo">Empresa actual<input name="empresaActual" value={form.empresaActual || ""} onChange={handleChange} /></label>
            </div>
          </div>
          <div className="botones">
            <button className="btn-primary" onClick={handleGuardar}>Guardar</button>
            <button className="btn-secondary" onClick={() => setEditando(false)}>Cancelar</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Perfil;