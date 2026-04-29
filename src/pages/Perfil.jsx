import { useState, useEffect } from "react";
function Perfil({ usuarioActivo, actualizarUsuarioActivo, cerrarSesion, setPagina }) {
  const [editando, setEditando] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const [form, setForm] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!usuarioActivo) return;
    const id = usuarioActivo.id_estudiante || usuarioActivo.id_empresa;
    const tipo = usuarioActivo.rol;

    if (tipo === "estudiante" && id) {
      fetch(`http://localhost:3001/api/estudiantes/${id}`)
        .then(res => res.json())
        .then(data => { setPerfil(data); setCargando(false); })
        .catch(() => setCargando(false));
    } else if (tipo === "empresa" && id) {
      fetch(`http://localhost:3001/api/empresas/${id}`)
        .then(res => res.json())
        .then(data => { setPerfil(data); setCargando(false); })
        .catch(() => setCargando(false));
    } else {
      setCargando(false);
    }
  }, [usuarioActivo]);

  if (!usuarioActivo) {
    return (
      <div className="contenedor">
        <h2>Perfil de Usuario</h2>
        <p style={{ textAlign: "center" }}>Debes iniciar sesión para ver tu perfil.</p>
      </div>
    );
  }

  if (cargando) return <div className="contenedor"><p>Cargando perfil...</p></div>;

  const handleEditar = () => { setForm({ ...perfil }); setEditando(true); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGuardar = async () => {
    const tipo = usuarioActivo.rol;
    const id = usuarioActivo.id_estudiante || usuarioActivo.id_empresa;
    const url = tipo === "estudiante"
      ? `http://localhost:3001/api/estudiantes/${id}`
      : `http://localhost:3001/api/empresas/${id}`;

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.ok) {
        setPerfil(form);
        setEditando(false);
        alert("Perfil guardado ✅");
      }
    } catch (err) {
      alert("Error al guardar");
    }
  };

  const handleEliminar = async () => {
    if (!window.confirm("¿Eliminar perfil?")) return;
    cerrarSesion();
    setPagina("home");
  };

  const esEstudiante = usuarioActivo.rol === "estudiante";

  return (
    <div className="contenedor">
      <h2>Perfil de Usuario</h2>

      {!editando ? (
        <>
          {esEstudiante ? (
            <>
              <div className="seccion">
                <h4>Información Personal</h4>
                <table className="tabla-perfil">
                  <tbody>
                    <tr><td>Nombre</td><td>{perfil?.nombre} {perfil?.apellido}</td></tr>
                    <tr><td>Correo</td><td>{perfil?.correo}</td></tr>
                    <tr><td>Teléfono</td><td>{perfil?.telefono}</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="seccion">
                <h4>Información Académica</h4>
                <table className="tabla-perfil">
                  <tbody>
                    <tr><td>Programa</td><td>{perfil?.programa}</td></tr>
                    <tr><td>Semestre</td><td>{perfil?.semestre}</td></tr>
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="seccion">
              <h4>Datos de la Empresa</h4>
              <table className="tabla-perfil">
                <tbody>
                  <tr><td>Nombre</td><td>{perfil?.nombre}</td></tr>
                  <tr><td>NIT</td><td>{perfil?.nit}</td></tr>
                  <tr><td>Sector</td><td>{perfil?.sector}</td></tr>
                  <tr><td>Correo</td><td>{perfil?.correo_contacto}</td></tr>
                  <tr><td>Descripción</td><td>{perfil?.descripcion}</td></tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="botones">
            <button className="btn-primary" onClick={handleEditar}>Editar</button>
            <button className="btn-danger" onClick={handleEliminar}>Eliminar perfil</button>
            <button className="btn-secondary" onClick={() => { cerrarSesion(); setPagina("home"); }}>
              Cerrar sesión
            </button>
          </div>
        </>
      ) : (
        <>
          {esEstudiante ? (
            <div className="seccion">
              <h4>Editar Perfil</h4>
              <div className="grid-2">
                <label className="campo">Nombre<input name="nombre" value={form.nombre || ""} onChange={handleChange} /></label>
                <label className="campo">Apellido<input name="apellido" value={form.apellido || ""} onChange={handleChange} /></label>
                <label className="campo">Teléfono<input name="telefono" value={form.telefono || ""} onChange={handleChange} /></label>
                <label className="campo">Programa<input name="programa" value={form.programa || ""} onChange={handleChange} /></label>
                <label className="campo">Semestre<input name="semestre" type="number" value={form.semestre || ""} onChange={handleChange} /></label>
              </div>
            </div>
          ) : (
            <div className="seccion">
              <h4>Editar Empresa</h4>
              <div className="grid-2">
                <label className="campo">Nombre<input name="nombre" value={form.nombre || ""} onChange={handleChange} /></label>
                <label className="campo">Sector<input name="sector" value={form.sector || ""} onChange={handleChange} /></label>
              </div>
              <label className="campo">Descripción
                <textarea name="descripcion" rows={3} value={form.descripcion || ""} onChange={handleChange} />
              </label>
            </div>
          )}

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
