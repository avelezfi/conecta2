

import { useState } from "react";

function Registro({ estudiantes, empresas, actualizarEstudiantes, actualizarEmpresas, setPagina }) {
  const [tipo, setTipo] = useState("estudiante");
  const [mensaje, setMensaje] = useState("");

  const [formEstudiante, setFormEstudiante] = useState({
    nombre: "", email: "", password: "", telefono: "",
    ciudad: "", programa: "", semestre: "", institucion: "",
    cargoDeseado: "", empresaActual: "",
  });

  const [formEmpresa, setFormEmpresa] = useState({
    nombre: "", nit: "", email: "", password: "",
    ciudad: "", sector: "", descripcion: "",
  });

  const handleChangeEstudiante = (e) =>
    setFormEstudiante({ ...formEstudiante, [e.target.name]: e.target.value });

  const handleChangeEmpresa = (e) =>
    setFormEmpresa({ ...formEmpresa, [e.target.name]: e.target.value });

  const handleRegistro = () => {
    if (tipo === "estudiante") {
      if (!formEstudiante.nombre || !formEstudiante.email || !formEstudiante.password) {
        setMensaje("Nombre, correo y contraseña son obligatorios"); return;
      }
      if (formEstudiante.password.length < 6) {
        setMensaje("La contraseña debe tener mínimo 6 caracteres"); return;
      }
      if (estudiantes.find((u) => u.email === formEstudiante.email)) {
        setMensaje("Este correo ya está registrado"); return;
      }
      actualizarEstudiantes([...estudiantes, { id: Date.now(), tipo: "estudiante", ...formEstudiante }]);
      setMensaje("¡Estudiante registrado con éxito!");
      setTimeout(() => setPagina("login"), 1500);
    } else {
      if (!formEmpresa.nombre || !formEmpresa.email || !formEmpresa.password || !formEmpresa.nit) {
        setMensaje("Nombre, NIT, correo y contraseña son obligatorios"); return;
      }
      if (formEmpresa.password.length < 6) {
        setMensaje("La contraseña debe tener mínimo 6 caracteres"); return;
      }
      if (empresas.find((u) => u.email === formEmpresa.email)) {
        setMensaje("Este correo ya está registrado"); return;
      }
      actualizarEmpresas([...empresas, { id: Date.now(), tipo: "empresa", ...formEmpresa }]);
      setMensaje("¡Empresa registrada con éxito!");
      setTimeout(() => setPagina("login"), 1500);
    }
  };

  return (
    <div className="contenedor">
      <h2>Registro de Usuario</h2>

      <div className="tipo-selector">
        <label>
          <input type="radio" value="estudiante" checked={tipo === "estudiante"}
            onChange={() => { setTipo("estudiante"); setMensaje(""); }} />
          Estudiante
        </label>
        <label>
          <input type="radio" value="empresa" checked={tipo === "empresa"}
            onChange={() => { setTipo("empresa"); setMensaje(""); }} />
          Empresa
        </label>
      </div>

      {tipo === "estudiante" && (
        <>
          <div className="seccion">
            <h4> Información Personal</h4>
            <div className="grid-2">
              <label className="campo">Nombre completo
                <input name="nombre" value={formEstudiante.nombre} onChange={handleChangeEstudiante} />
              </label>
              <label className="campo">Correo electrónico
                <input name="email" type="email" value={formEstudiante.email} onChange={handleChangeEstudiante} />
              </label>
              <label className="campo">Contraseña
                <input name="password" type="password" value={formEstudiante.password} onChange={handleChangeEstudiante} />
              </label>
              <label className="campo">Teléfono
                <input name="telefono" value={formEstudiante.telefono} onChange={handleChangeEstudiante} />
              </label>
              <label className="campo">Ciudad
                <input name="ciudad" value={formEstudiante.ciudad} onChange={handleChangeEstudiante} />
              </label>
            </div>
          </div>

          <div className="seccion">
            <h4> Información Académica</h4>
            <div className="grid-2">
              <label className="campo">Programa
                <input name="programa" value={formEstudiante.programa} onChange={handleChangeEstudiante} />
              </label>
              <label className="campo">Semestre
                <input name="semestre" value={formEstudiante.semestre} onChange={handleChangeEstudiante} />
              </label>
              <label className="campo">Institución
                <input name="institucion" value={formEstudiante.institucion} onChange={handleChangeEstudiante} />
              </label>
            </div>
          </div>

          <div className="seccion">
            <h4> Información Laboral</h4>
            <div className="grid-2">
              <label className="campo">Cargo deseado
                <input name="cargoDeseado" value={formEstudiante.cargoDeseado} onChange={handleChangeEstudiante} />
              </label>
              <label className="campo">Empresa actual
                <input name="empresaActual" value={formEstudiante.empresaActual} onChange={handleChangeEstudiante} />
              </label>
            </div>
          </div>
        </>
      )}

      {tipo === "empresa" && (
        <div className="seccion">
          <h4> Datos de la Empresa</h4>
          <div className="grid-2">
            <label className="campo">Nombre de la empresa
              <input name="nombre" value={formEmpresa.nombre} onChange={handleChangeEmpresa} />
            </label>
            <label className="campo">NIT
              <input name="nit" value={formEmpresa.nit} onChange={handleChangeEmpresa} />
            </label>
            <label className="campo">Correo electrónico
              <input name="email" type="email" value={formEmpresa.email} onChange={handleChangeEmpresa} />
            </label>
            <label className="campo">Contraseña
              <input name="password" type="password" value={formEmpresa.password} onChange={handleChangeEmpresa} />
            </label>
            <label className="campo">Ciudad
              <input name="ciudad" value={formEmpresa.ciudad} onChange={handleChangeEmpresa} />
            </label>
            <label className="campo">Sector
              <input name="sector" value={formEmpresa.sector} onChange={handleChangeEmpresa} />
            </label>
          </div>
          <label className="campo">Descripción
            <textarea name="descripcion" rows={3} value={formEmpresa.descripcion} onChange={handleChangeEmpresa} />
          </label>
        </div>
      )}

      {mensaje && (
        <p className={mensaje.includes("éxito") ? "mensaje-exito" : "mensaje-error"}>
          {mensaje}
        </p>
      )}

      <div className="botones">
        <button className="btn-primary" onClick={handleRegistro}>Registrarse</button>
        <span className="link" onClick={() => setPagina("login")}>¿Ya tienes cuenta? Inicia sesión</span>
      </div>
    </div>
  );
}

export default Registro;