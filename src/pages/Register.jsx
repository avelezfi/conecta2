

import { useState } from "react";

function Registro({ setPagina }) {
  const [tipo, setTipo] = useState("estudiante");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const [formEstudiante, setFormEstudiante] = useState({
    nombre: "", apellido: "", email: "", password: "",
    telefono: "", programa: "", semestre: "",
  });

  const [formEmpresa, setFormEmpresa] = useState({
    nombre: "", nit: "", email: "", password: "",
    sector: "", descripcion: "",
  });

  const handleChangeEstudiante = (e) =>
    setFormEstudiante({ ...formEstudiante, [e.target.name]: e.target.value });

  const handleChangeEmpresa = (e) =>
    setFormEmpresa({ ...formEmpresa, [e.target.name]: e.target.value });

  const handleRegistro = async () => {
    setCargando(true);
    setMensaje("");

    try {
      if (tipo === "estudiante") {
        if (!formEstudiante.nombre || !formEstudiante.email || !formEstudiante.password) {
          setMensaje("Nombre, correo y contraseña son obligatorios");
          setCargando(false); return;
        }
        if (formEstudiante.password.length < 6) {
          setMensaje("La contraseña debe tener mínimo 6 caracteres");
          setCargando(false); return;
        }

        // 1. Crear estudiante
        const resEst = await fetch("http://localhost:3001/api/estudiantes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: formEstudiante.nombre,
            apellido: formEstudiante.apellido,
            correo: formEstudiante.email,
            telefono: formEstudiante.telefono,
            programa: formEstudiante.programa,
            semestre: parseInt(formEstudiante.semestre) || 1,
          })
        });
        const dataEst = await resEst.json();
        if (!resEst.ok) {
          setMensaje(dataEst.error || "Error al registrar estudiante");
          setCargando(false); return;
        }

        // 2. Crear usuario vinculado al estudiante
        const resUsu = await fetch("http://localhost:3001/api/usuarios/registro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            correo: formEstudiante.email,
            contrasena: formEstudiante.password,
            rol: "estudiante",
            id_estudiante: dataEst.id,
            id_empresa: null
          })
        });
        const dataUsu = await resUsu.json();
        if (!resUsu.ok) {
          setMensaje(dataUsu.error || "Error al crear usuario");
          setCargando(false); return;
        }

        setMensaje("¡Estudiante registrado con éxito!");
        setTimeout(() => setPagina("login"), 1500);

      } else {
        if (!formEmpresa.nombre || !formEmpresa.email || !formEmpresa.password || !formEmpresa.nit) {
          setMensaje("Nombre, NIT, correo y contraseña son obligatorios");
          setCargando(false); return;
        }
        if (formEmpresa.password.length < 6) {
          setMensaje("La contraseña debe tener mínimo 6 caracteres");
          setCargando(false); return;
        }

        // 1. Crear empresa
        const resEmp = await fetch("http://localhost:3001/api/empresas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: formEmpresa.nombre,
            nit: formEmpresa.nit,
            sector: formEmpresa.sector,
            correo_contacto: formEmpresa.email,
            descripcion: formEmpresa.descripcion,
          })
        });
        const dataEmp = await resEmp.json();
        if (!resEmp.ok) {
          setMensaje(dataEmp.error || "Error al registrar empresa");
          setCargando(false); return;
        }

        // 2. Crear usuario vinculado a la empresa
        const resUsu = await fetch("http://localhost:3001/api/usuarios/registro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            correo: formEmpresa.email,
            contrasena: formEmpresa.password,
            rol: "empresa",
            id_estudiante: null,
            id_empresa: dataEmp.id
          })
        });
        const dataUsu = await resUsu.json();
        if (!resUsu.ok) {
          setMensaje(dataUsu.error || "Error al crear usuario");
          setCargando(false); return;
        }

        setMensaje("¡Empresa registrada con éxito!");
        setTimeout(() => setPagina("login"), 1500);
      }
    } catch (err) {
      setMensaje("Error al conectar con el servidor");
    } finally {
      setCargando(false);
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
            <h4>Información Personal</h4>
            <div className="grid-2">
              <label className="campo">Nombre
                <input name="nombre" value={formEstudiante.nombre} onChange={handleChangeEstudiante} />
              </label>
              <label className="campo">Apellido
                <input name="apellido" value={formEstudiante.apellido} onChange={handleChangeEstudiante} />
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
            </div>
          </div>

          <div className="seccion">
            <h4>Información Académica</h4>
            <div className="grid-2">
              <label className="campo">Programa
                <input name="programa" value={formEstudiante.programa} onChange={handleChangeEstudiante} />
              </label>
              <label className="campo">Semestre
                <input name="semestre" type="number" value={formEstudiante.semestre} onChange={handleChangeEstudiante} />
              </label>
            </div>
          </div>
        </>
      )}

      {tipo === "empresa" && (
        <div className="seccion">
          <h4>Datos de la Empresa</h4>
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
        <button className="btn-primary" onClick={handleRegistro} disabled={cargando}>
          {cargando ? "Registrando..." : "Registrarse"}
        </button>
        <span className="link" onClick={() => setPagina("login")}>¿Ya tienes cuenta? Inicia sesión</span>
      </div>
    </div>
  );
}

export default Registro;
