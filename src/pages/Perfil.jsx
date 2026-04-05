import { useState } from "react";

function Perfil({ usuarioActivo, setUsuarioActivo, usuarios, setUsuarios }) {
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});

  if (!usuarioActivo) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Perfil de Usuario</h2>
        <p>⚠️ Debes iniciar sesión para ver tu perfil.</p>
      </div>
    );
  }

  const handleEditar = () => {
    setForm({ ...usuarioActivo });
    setEditando(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    console.log("guardando:", form);
    const usuariosActualizados = usuarios.map((u) =>
      u.id === usuarioActivo.id ? form : u
    );
    setUsuarios(usuariosActualizados);
    setUsuarioActivo(form);
    setEditando(false);
    alert("✅ Perfil guardado");
  };

  const handleEliminar = () => {
    if (window.confirm("¿Eliminar perfil?")) {
      setUsuarios(usuarios.filter((u) => u.id !== usuarioActivo.id));
      setUsuarioActivo(null);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "700px" }}>
      <h2>Perfil de Usuario</h2>

      {!editando ? (
        <>
          <h3>👤 Información Personal</h3>
          <table border="1" cellPadding="10" style={{ width: "100%", marginBottom: "1rem" }}>
            <tbody>
              <tr><td><strong>Nombre</strong></td><td>{usuarioActivo.nombre || "—"}</td></tr>
              <tr><td><strong>Correo</strong></td><td>{usuarioActivo.email || "—"}</td></tr>
              <tr><td><strong>Teléfono</strong></td><td>{usuarioActivo.telefono || "—"}</td></tr>
              <tr><td><strong>Ciudad</strong></td><td>{usuarioActivo.ciudad || "—"}</td></tr>
            </tbody>
          </table>

          <h3>🎓 Información Académica</h3>
          <table border="1" cellPadding="10" style={{ width: "100%", marginBottom: "1rem" }}>
            <tbody>
              <tr><td><strong>Programa</strong></td><td>{usuarioActivo.programa || "—"}</td></tr>
              <tr><td><strong>Semestre</strong></td><td>{usuarioActivo.semestre || "—"}</td></tr>
              <tr><td><strong>Institución</strong></td><td>{usuarioActivo.institucion || "—"}</td></tr>
            </tbody>
          </table>

          <h3>💼 Información Laboral</h3>
          <table border="1" cellPadding="10" style={{ width: "100%", marginBottom: "1rem" }}>
            <tbody>
              <tr><td><strong>Cargo deseado</strong></td><td>{usuarioActivo.cargo || "—"}</td></tr>
              <tr><td><strong>Empresa actual</strong></td><td>{usuarioActivo.empresa || "—"}</td></tr>
              <tr><td><strong>Experiencia</strong></td><td>{usuarioActivo.experiencia || "—"}</td></tr>
              <tr><td><strong>Habilidades</strong></td><td>{usuarioActivo.habilidades || "—"}</td></tr>
            </tbody>
          </table>

          <button onClick={handleEditar} style={{ marginRight: "1rem", padding: "0.5rem 1rem" }}>
            ✏️ Editar perfil
          </button>
          <button onClick={handleEliminar} style={{ padding: "0.5rem 1rem", backgroundColor: "red", color: "white" }}>
            🗑️ Eliminar perfil
          </button>
        </>
      ) : (
        <>
          <h3>👤 Información Personal</h3>
          <input name="nombre" placeholder="Nombre" value={form.nombre || ""} onChange={handleChange} style={{ width: "100%", marginBottom: "0.5rem" }} /><br />
          <input name="email" placeholder="Correo" value={form.email || ""} onChange={handleChange} style={{ width: "100%", marginBottom: "0.5rem" }} /><br />
          <input name="telefono" placeholder="Teléfono" value={form.telefono || ""} onChange={handleChange} style={{ width: "100%", marginBottom: "0.5rem" }} /><br />
          <input name="ciudad" placeholder="Ciudad" value={form.ciudad || ""} onChange={handleChange} style={{ width: "100%", marginBottom: "1rem" }} /><br />

          <h3>🎓 Información Académica</h3>
          <input name="programa" placeholder="Programa" value={form.programa || ""} onChange={handleChange} style={{ width: "100%", marginBottom: "0.5rem" }} /><br />
          <input name="semestre" placeholder="Semestre" value={form.semestre || ""} onChange={handleChange} style={{ width: "100%", marginBottom: "0.5rem" }} /><br />
          <input name="institucion" placeholder="Institución" value={form.institucion || ""} onChange={handleChange} style={{ width: "100%", marginBottom: "1rem" }} /><br />

          <h3>💼 Información Laboral</h3>
          <input name="cargo" placeholder="Cargo deseado" value={form.cargo || ""} onChange={handleChange} style={{ width: "100%", marginBottom: "0.5rem" }} /><br />
          <input name="empresa" placeholder="Empresa actual" value={form.empresa || ""} onChange={handleChange} style={{ width: "100%", marginBottom: "0.5rem" }} /><br />
          <input name="experiencia" placeholder="Años de experiencia" value={form.experiencia || ""} onChange={handleChange} style={{ width: "100%", marginBottom: "0.5rem" }} /><br />
          <input name="habilidades" placeholder="Habilidades" value={form.habilidades || ""} onChange={handleChange} style={{ width: "100%", marginBottom: "1rem" }} /><br />

          <button onClick={handleGuardar} style={{ marginRight: "1rem", padding: "0.5rem 1rem" }}>
            💾 Guardar cambios
          </button>
          <button onClick={() => setEditando(false)} style={{ padding: "0.5rem 1rem" }}>
            ❌ Cancelar
          </button>
        </>
      )}
    </div>
  );
}

export default Perfil;