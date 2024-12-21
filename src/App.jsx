import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// TEMA
import "primereact/resources/themes/lara-light-indigo/theme.css";
// NUCLEO
import "primereact/resources/primereact.min.css";
// ICONOS
import "primeicons/primeicons.css";

import 'primeflex/primeflex.css';

// BARRA NAVEGACION
import Navigation from "./components/Navigation";

// PAGINAS
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Menu } from "./pages/Menu";
import { EditaMenu } from "./pages/EditaMenu";
import EditaCupones from "./pages/EditaCupones";
import MenuCupon from "./pages/MenuCupon";
import Config from "./pages/Config";
import Cupon from "./pages/Cupon";

function App() {

  let location = useLocation();

  return (
    <>

      { location.pathname !== '/menu' && <Navigation /> }

      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/menu" element={<Menu />} />
          <Route path="/cupon" element={<Cupon />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/editamenu" element={<EditaMenu />} />
          <Route path="/editacupon" element={<EditaCupones />} />
          <Route path="/menu/cupon" element={<MenuCupon />} />
          <Route path="/config" element={<Config />} />
        </Routes>
      {/* </BrowserRouter> */}
    </>
  )
}

const MainApp = () => (
  <div>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>
)

export default MainApp