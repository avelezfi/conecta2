



import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


import { useState } from "react";
import Home from "./pages/Home";
import Vacantes from "./pages/Vacantes";
import Empresas from "./pages/Empresas";
import Login from "./pages/Login";
import Registro from "./pages/Register";
import Perfil from "./pages/Perfil";
import PerfilEmpresa from "./pages/PerfilEmpresas";

function App() {

  // Lista de estudiantes
  const [estudiantes, setEstudiantes] = useState(() => {
    const guardados = localStorage.getItem("estudiantes");
    return guardados ? JSON.parse(guardados) : [];
  });

  // Lista de empresas
  const [empresas, setEmpresas] = useState(() => {
    const guardados = localStorage.getItem("empresas");
    return guardados ? JSON.parse(guardados) : [];
  });

  // Usuario activo
  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    const activo = localStorage.getItem("usuarioActivo");
    return activo ? JSON.parse(activo) : null;
  });

  // Tipo de usuario activo: "estudiante" o "empresa"
  const [tipoUsuario, setTipoUsuario] = useState(() => {
    return localStorage.getItem("tipoUsuario") || null;
  });

  // Guardar estudiantes en localStorage cuando cambian
  const actualizarEstudiantes = (lista) => {
    setEstudiantes(lista);
    localStorage.setItem("estudiantes", JSON.stringify(lista));
  };

  // Guardar empresas en localStorage cuando cambian
  const actualizarEmpresas = (lista) => {
    setEmpresas(lista);
    localStorage.setItem("empresas", JSON.stringify(lista));
  };

  // Guardar usuario activo
  const actualizarUsuarioActivo = (usuario, tipo) => {
    setUsuarioActivo(usuario);
    setTipoUsuario(tipo);
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    localStorage.setItem("tipoUsuario", tipo);
  };

  // Cerrar sesión
  const cerrarSesion = () => {
    setUsuarioActivo(null);
    setTipoUsuario(null);
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("tipoUsuario");
  };

  // --- Navegación simple ---
  const [pagina, setPagina] = useState("home");

  const renderPagina = () => {
    switch (pagina) {
      case "home":
        return <Home />;
      case "vacantes":
         return <Vacantes usuarioActivo={usuarioActivo} setPagina={setPagina} />;
      case "empresas":
        return <Empresas />;
      case "login":
        return (
          <Login
            estudiantes={estudiantes}
            empresas={empresas}
            actualizarUsuarioActivo={actualizarUsuarioActivo}
            setPagina={setPagina}
          />
        );
      case "registro":
        return (
          <Registro
            estudiantes={estudiantes}
            empresas={empresas}
            actualizarEstudiantes={actualizarEstudiantes}
            actualizarEmpresas={actualizarEmpresas}
            setPagina={setPagina}
          />
        );
      case "perfil":
        return tipoUsuario === "empresa" ? (
          <PerfilEmpresa
            usuarioActivo={usuarioActivo}
            empresas={empresas}
            actualizarEmpresas={actualizarEmpresas}
            actualizarUsuarioActivo={actualizarUsuarioActivo}
            cerrarSesion={cerrarSesion}
            setPagina={setPagina}
          />
        ) : (
          <Perfil
            usuarioActivo={usuarioActivo}
            estudiantes={estudiantes}
            actualizarEstudiantes={actualizarEstudiantes}
            actualizarUsuarioActivo={actualizarUsuarioActivo}
            cerrarSesion={cerrarSesion}
            setPagina={setPagina}
          />
        );
      default:
        return <Home />;
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav>
        <span onClick={() => setPagina("home")}>Inicio</span> |
        <span onClick={() => setPagina("vacantes")}> Vacantes</span> |
        <span onClick={() => setPagina("empresas")}> Empresas</span> |
        {!usuarioActivo ? (
          <>
            <span onClick={() => setPagina("login")}> Login</span> |
            <span onClick={() => setPagina("registro")}> Registro</span>
          </>
        ) : (
          <>
            <span onClick={() => setPagina("perfil")}> Perfil ({tipoUsuario})</span> |
            <span onClick={cerrarSesion}> Cerrar sesión</span>
          </>
        )}
      </nav>

      {/* Contenido */}
      {renderPagina()}
    </div>
  );
}

export default App;