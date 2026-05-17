import { useState } from "react";

export default function PublicarVacante({ usuarioActivo, setPagina }) {
  // Tenías useState duplicado — solo debe ir una vez aquí arriba
  const [form, setForm] = useState({
    titulo: "", descripcion: "", modalidad: "Presencial"
  });
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePublicar = async () => {
    if (!form.titulo) { setMensaje("El título es obligatorio"); return; }
    setCargando(true);
    try {
      const res = await fetch("http://localhost:3001/api/vacantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          id_empresa: usuarioActivo.id_empresa
        })
      });
      const data = await res.json();
      if (data.ok) {
        setMensaje("¡Vacante publicada exitosamente! ");
        setForm({ titulo: "", descripcion: "", modalidad: "Presencial" });
        setTimeout(() => setPagina("vacantes"), 1500);
      } else {
        setMensaje("Error al publicar: " + (data.error || ""));
      }
    } catch (err) {
      setMensaje("Error al conectar con el servidor");
    } finally {
      setCargando(false);
    }
  };

  if (!usuarioActivo || usuarioActivo.rol !== "empresa") {
    return (
      <div className="contenedor">
        <p>Solo las empresas pueden publicar vacantes.</p>
      </div>
    );
  }

  return (
    <div className="contenedor" style={{ maxWidth: "600px" }}>
      <h2>Publicar Vacante</h2>
      <div className="seccion">
        <label className="campo">
          Título del cargo *
          <input name="titulo" value={form.titulo} onChange={handleChange}
            placeholder="Ej: Desarrollador Frontend" />
        </label>
        <label className="campo">
          Descripción
          <textarea name="descripcion" rows={4} value={form.descripcion}
            onChange={handleChange} placeholder="Describe el cargo, requisitos, etc." />
        </label>
        <label className="campo">
          Modalidad
          {/* Tenías valores con tilde que no existen en la BD */}
          <select name="modalidad" value={form.modalidad} onChange={handleChange}>
            <option value="Presencial">Presencial</option>
            <option value="Hibrida">Híbrida</option>
            <option value="Remoto">Remoto</option>
          </select>
        </label>
      </div>
      {mensaje && (
        <p className={mensaje.includes("") ? "mensaje-exito" : "mensaje-error"}>
          {mensaje}
        </p>
      )}
      <div className="botones">
        <button className="btn-primary" onClick={handlePublicar} disabled={cargando}>
          {cargando ? "Publicando..." : "Publicar vacante"}
        </button>
        <button className="btn-secondary" onClick={() => setPagina("vacantes")}>
          Cancelar
        </button>
      </div>
    </div>
  );
}