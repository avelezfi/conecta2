import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState,useEffect} from"react"




import Home from "./pages/Home";
import Vacantes from "./pages/Vacantes";
import Empresas from "./pages/Empresas";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Perfil from "./pages/Perfil";

function App() {
   
    const [usuarios, setUsuarios] = useState(() => {
    const guardados = localStorage.getItem("usuarios");
    return guardados ? JSON.parse(guardados) : [];
  });

  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    const activo = localStorage.getItem("usuarioActivo");
    return activo ? JSON.parse(activo) : null;
  });

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    if (usuarioActivo) {
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
    } else {
      localStorage.removeItem("usuarioActivo");
    }
  }, [usuarioActivo]);
  
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link> | 
        <Link to="/vacantes">Vacantes</Link> | 
        <Link to="/empresas">Empresas</Link> | 
        <Link to="/login">Login</Link> | 
        <Link to="/register">Register</Link> | 
         <Link to="/perfil">Perfil</Link> | 
        
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vacantes" element={<Vacantes />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/login" element={
          <Login 
            usuarios={usuarios}
            setUsuarioActivo={setUsuarioActivo}
          />
        } />
        <Route path="/register" element={
          <Register
            usuarios={usuarios}
            setUsuarios={setUsuarios}
          />
        }/>
        <Route path="/perfil" element={
          <Perfil 
            usuarioActivo={usuarioActivo}
            setUsuarioActivo={setUsuarioActivo}
            usuarios={usuarios}
            setUsuarios={setUsuarios}



          />
        } />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;

