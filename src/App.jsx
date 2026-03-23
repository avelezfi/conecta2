import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Vacantes from "./pages/Vacantes";
import Empresas from "./pages/Empresas";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link> | 
        <Link to="/vacantes">Vacantes</Link> | 
        <Link to="/empresas">Empresas</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vacantes" element={<Vacantes />} />
        <Route path="/empresas" element={<Empresas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;