import { useState } from "react";

// Recibe usuarios y setUsuarioActivo como props desde App.jsx
function Login({ usuarios, setUsuarioActivo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = () => {
    // Busca en la lista si existe un usuario con ese email y password
    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (usuarioEncontrado) {
      // Guarda el usuario activo en App.jsx
      setUsuarioActivo(usuarioEncontrado);
      setMensaje(` Bienvenido ${usuarioEncontrado.nombre}`);
    } else {
      setMensaje(" Correo o contraseña incorrectos");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleLogin}>Ingresar</button>
      <p>{mensaje}</p>
    </div>
  );
}

export default Login;