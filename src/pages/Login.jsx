import { useState } from "react";

function Login({ actualizarUsuarioActivo, setPagina }) {
  const [tipo, setTipo] = useState("estudiante");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setMensaje("Por favor completa todos los campos");
      return;
    }
    setCargando(true);
    setMensaje("");
    try {
      const res = await fetch("http://localhost:3001/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, contrasena: password })
      });
      const data = await res.json();
      if (!res.ok) {
        setMensaje(data.error || "Correo o contraseña incorrectos");
        return;
      }
      const usuario = data.usuario;
      if (tipo === "estudiante" && usuario.rol !== "estudiante") {
        setMensaje("Esta cuenta no es de estudiante");
        return;
      }
      if (tipo === "empresa" && usuario.rol !== "empresa") {
        setMensaje("Esta cuenta no es de empresa");
        return;
      }
      actualizarUsuarioActivo(usuario, tipo);
      setMensaje("¡Bienvenido!");
      setTimeout(() => setPagina("perfil"), 1500);
    } catch (err) {
      setMensaje("Error al conectar con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="contenedor" style={{ maxWidth: "450px" }}>
      <h2>Iniciar Sesión</h2>
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
      <div className="seccion">
        <label className="campo" style={{ marginBottom: "1rem" }}>
          Correo electrónico
          <input type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="campo">
          Contraseña
          <input type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      {mensaje && (
        <p className={mensaje.includes("Bienvenido") ? "mensaje-exito" : "mensaje-error"}>
          {mensaje}
        </p>
      )}
      <div className="botones">
        <button className="btn-primary" onClick={handleLogin} disabled={cargando}>
          {cargando ? "Verificando..." : "Ingresar"}
        </button>
      </div>
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        ¿No tienes cuenta?{" "}
        <span className="link" onClick={() => setPagina("registro")}>Regístrate aquí</span>
      </p>
    </div>
  );
}

export default Login;