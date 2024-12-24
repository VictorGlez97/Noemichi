import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

// TEMA
import "primereact/resources/themes/lara-light-indigo/theme.css";
// NUCLEO
import "primereact/resources/primereact.min.css";
// ICONOS
import "primeicons/primeicons.css";

import 'primeflex/primeflex.css';

// BARRA NAVEGACION
import Navigation from "./components/Navigation";
import { AuthProvider, useAuth } from "./components/Context";

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
import NewOrders from "./pages/NewOrders";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Error from "./pages/Error";

function App() {

  const { user } = useAuth();

  // let location = useLocation();

  return (
    <>
      { user !== null ? <AuthenticatedRoutes /> : <GuestRoutes /> }
    </>
  )
}

const AuthenticatedRoutes = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/editamenu" element={<EditaMenu />} />
        <Route path="/editacupon" element={<EditaCupones />} />
        <Route path="/config" element={<Config />} />
        <Route path="/pedidos" element={<Orders />} />
        <Route path="*" element={<Navigate to='/' replace />} />
      </Routes>
    </>
  );
}

const GuestRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/cupon" element={<MenuCupon />} />
        <Route path="/cupon" element={<Cupon />} />
        <Route path="/pedido" element={<NewOrders />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

const MainApp = () => (
  <div>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </div>
)

export default MainApp