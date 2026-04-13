

import { useState } from "react";

function PerfilEmpresa({ usuarioActivo, empresas, actualizarEmpresas, actualizarUsuarioActivo, cerrarSesion, setPagina }) {
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});

  if (!usuarioActivo) {
    return (
      <div className="contenedor">
        <h2>Perfil de Empresa</h2>
        <p style={{ textAlign: "center" }}>Debes iniciar sesión para ver tu perfil.</p>
      </div>
    );
  }

  const handleEditar = () => { setForm({ ...usuarioActivo }); setEditando(true); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGuardar = () => {
    const actualizadas = empresas.map((e) => e.id === usuarioActivo.id ? form : e);
    actualizarEmpresas(actualizadas);
    actualizarUsuarioActivo(form, "empresa");
    setEditando(false);
    alert("Perfil guardado ✅");
  };

  const handleEliminar = () => {
    if (window.confirm("¿Eliminar perfil de empresa?")) {
      actualizarEmpresas(empresas.filter((e) => e.id !== usuarioActivo.id));
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
                <tr><td>Nombre</td><td>{usuarioActivo.nombre}</td></tr>
                <tr><td>NIT</td><td>{usuarioActivo.nit}</td></tr>
                <tr><td>Correo</td><td>{usuarioActivo.email}</td></tr>
                <tr><td>Ciudad</td><td>{usuarioActivo.ciudad}</td></tr>
                <tr><td>Sector</td><td>{usuarioActivo.sector}</td></tr>
                <tr><td>Descripción</td><td>{usuarioActivo.descripcion}</td></tr>
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
            <h4>🏢 Editar Empresa</h4>
            <div className="grid-2">
              <label className="campo">Nombre<input name="nombre" value={form.nombre || ""} onChange={handleChange} /></label>
              <label className="campo">NIT<input name="nit" value={form.nit || ""} onChange={handleChange} /></label>
              <label className="campo">Correo<input name="email" type="email" value={form.email || ""} onChange={handleChange} /></label>
              <label className="campo">Ciudad<input name="ciudad" value={form.ciudad || ""} onChange={handleChange} /></label>
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