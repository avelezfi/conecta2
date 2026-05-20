import { useState, useEffect } from "react";

function PerfilEmpresa({ usuarioActivo, actualizarUsuarioActivo, cerrarSesion, setPagina }) {
  const [editando, setEditando] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const [form, setForm] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!usuarioActivo) return;

    // Bug 1 fix: usar id_empresa del usuario para buscar los datos reales
    const id = usuarioActivo.id_empresa;

    if (!id) {
      console.error("No se encontró id_empresa en usuarioActivo:", usuarioActivo);
      setCargando(false);
      return;
    }

    fetch(`http://localhost:3001/api/empresas/${id}`)
      .then(res => res.json())
      .then(data => {
        setPerfil(data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, [usuarioActivo]);

  if (!usuarioActivo) {
    return (
      <div className="contenedor">
        <h2>Perfil de Empresa</h2>
        <p style={{ textAlign: "center" }}>Debes iniciar sesión para ver tu perfil.</p>
      </div>
    );
  }

  if (cargando) return <div className="contenedor"><p>Cargando perfil...</p></div>;

  if (!perfil) return (
    <div className="contenedor">
      <p style={{ color: "red" }}>No se encontró información de la empresa. id_empresa: {String(usuarioActivo.id_empresa)}</p>
    </div>
  );

  const handleEditar = () => { setForm({ ...perfil }); setEditando(true); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGuardar = async () => {
    const id = usuarioActivo.id_empresa;
    try {
      const res = await fetch(`http://localhost:3001/api/empresas/${id}`, {
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

  const handleEliminar = () => {
    if (window.confirm("¿Eliminar perfil de empresa?")) {
      cerrarSesion();
      setPagina("home");
    }
  };

  return (
    <div className="contenedor">
      <h2>Perfil de Empresa</h2>

      {!editando ? (
        <>
          <div className="seccion">
            <h4>🏢 Información de la Empresa</h4>
            <table className="tabla-perfil">
              <tbody>
                {/* Bug 3 fix: usar campos reales de la BD */}
                <tr><td>Nombre</td><td>{perfil.nombre}</td></tr>
                <tr><td>NIT</td><td>{perfil.nit}</td></tr>
                <tr><td>Correo</td><td>{perfil.correo_contacto}</td></tr>
                <tr><td>Sector</td><td>{perfil.sector}</td></tr>
                <tr><td>Descripción</td><td>{perfil.descripcion}</td></tr>
              </tbody>
            </table>
          </div>
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
          <div className="botones">
            <button className="btn-primary" onClick={handleGuardar}>Guardar</button>
            <button className="btn-secondary" onClick={() => setEditando(false)}>Cancelar</button>
          </div>
        </>
      )}
    </div>
  );
}

export default PerfilEmpresa;