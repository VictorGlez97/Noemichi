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

function App() {

  let location = useLocation();

  return (
    <>

      { location.pathname !== '/menu' && <Navigation /> }

      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/menu" element={<Menu />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="editamenu" element={<EditaMenu />} />
        </Routes>
      {/* </BrowserRouter> */}
    </>
  )
}

const MainApp = () => (
  <div style={{ backgroundColor: '#ffc197' }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>
)

export default MainApp