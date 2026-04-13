import { useState } from "react";

function Login({ estudiantes, empresas, actualizarUsuarioActivo, setPagina }) {
  const [tipo, setTipo] = useState("estudiante");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setMensaje("Por favor completa todos los campos"); return;
    }
    let encontrado = tipo === "estudiante"
      ? estudiantes.find((u) => u.email === email && u.password === password)
      : empresas.find((u) => u.email === email && u.password === password);

    if (encontrado) {
      actualizarUsuarioActivo(encontrado, tipo);
      setMensaje(`¡Bienvenido ${encontrado.nombre}!`);
      setTimeout(() => setPagina("perfil"), 1500);
    } else {
      setMensaje("Correo o contraseña incorrectos");
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
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="campo">
          Contraseña
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>

      {mensaje && (
        <p className={mensaje.includes("Bienvenido") ? "mensaje-exito" : "mensaje-error"}>
          {mensaje}
        </p>
      )}

      <div className="botones">
        <button className="btn-primary" onClick={handleLogin}>Ingresar</button>
      </div>

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        ¿No tienes cuenta?{" "}
        <span className="link" onClick={() => setPagina("registro")}>Regístrate aquí</span>
      </p>
    </div>
  );
}

export default Login;