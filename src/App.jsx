import { useState } from "react";
import Home from "./pages/Home";
import Vacantes from "./pages/Vacantes";
import Empresas from "./pages/Empresas";
import Login from "./pages/Login";
import Registro from "./pages/Register";
import Perfil from "./pages/Perfil";
import PerfilEmpresa from "./pages/PerfilEmpresas";
import Seguimiento from "./pages/Seguimiento";

function App() {
  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    const activo = localStorage.getItem("usuarioActivo");
    return activo ? JSON.parse(activo) : null;
  });

  const [tipoUsuario, setTipoUsuario] = useState(() => {
    return localStorage.getItem("tipoUsuario") || null;
  });

  const actualizarUsuarioActivo = (usuario, tipo) => {
    setUsuarioActivo(usuario);
    setTipoUsuario(tipo);
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    localStorage.setItem("tipoUsuario", tipo);
  };

  const cerrarSesion = () => {
    setUsuarioActivo(null);
    setTipoUsuario(null);
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("tipoUsuario");
  };

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
            actualizarUsuarioActivo={actualizarUsuarioActivo}
            setPagina={setPagina}
          />
        );
      case "registro":
        return (
          <Registro
            setPagina={setPagina}
          />
        );
      case "perfil":
        return tipoUsuario === "empresa" ? (
          <PerfilEmpresa
            usuarioActivo={usuarioActivo}
            actualizarUsuarioActivo={actualizarUsuarioActivo}
            cerrarSesion={cerrarSesion}
            setPagina={setPagina}
          />
        ) : (
          <Perfil
            usuarioActivo={usuarioActivo}
            actualizarUsuarioActivo={actualizarUsuarioActivo}
            cerrarSesion={cerrarSesion}
            setPagina={setPagina}
          />
        );
      case "seguimiento":
        return <Seguimiento usuarioActivo={usuarioActivo} />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
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
            {tipoUsuario === "estudiante" && (
              <>
                <span onClick={() => setPagina("seguimiento")}> Seguimiento</span> |
              </>
            )}
            <span onClick={() => setPagina("perfil")}> Perfil ({tipoUsuario})</span> |
            <span onClick={cerrarSesion}> Cerrar sesión</span>
          </>
        )}
      </nav>

      {renderPagina()}
    </div>
  );
}

export default App;