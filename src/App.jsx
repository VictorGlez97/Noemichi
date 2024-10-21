import { BrowserRouter, Routes, Route } from "react-router-dom";

// TEMA
import "primereact/resources/themes/lara-light-indigo/theme.css";
// NUCLEO
import "primereact/resources/primereact.min.css";
// ICONOS
import "primeicons/primeicons.css";

// BARRA NAVEGACION
import Navigation from "./components/Navigation";

// PAGINAS
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
