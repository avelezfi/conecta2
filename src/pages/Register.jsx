

import { useState } from "react";

// Recibe usuarios y setUsuarios como props desde App.jsx
function Register({ usuarios, setUsuarios }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegister = () => {
    // Validar que todos los campos estén llenos
    if (nombre === "" || email === "" || password === "") {
      setMensaje(" Todos los campos son obligatorios");
      return;
    }
    // Validar longitud de contraseña
    if (password.length < 6) {
      setMensaje(" La contraseña debe tener mínimo 6  caracteres");
      return;
    }
    // Verificar si el email ya existe
    const yaExiste = usuarios.find((u) => u.email === email);
    if (yaExiste) {
      setMensaje(" Este correo ya está registrado");
      return;
          }
    // Crear usuario con ID único
    const nuevoUsuario = {
      id: Date.now(),
      nombre,
      email,
      password
    };
    // Guardar el nuevo usuario en App.jsx
    setUsuarios([...usuarios, { nombre, email, password }]);
    setMensaje(` Usuario ${nombre} registrado exitosamente`);
    // Limpiar los campos
    setNombre("");
    setEmail("");
    setPassword("");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Registro de Usuario</h2>
      <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      /><br /><br />
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
      <button onClick={handleRegister}>Registrarse</button>
      <p>{mensaje}</p>
    </div>
  );
}

export default Register;