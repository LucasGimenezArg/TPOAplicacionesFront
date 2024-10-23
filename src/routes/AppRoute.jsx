import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Header from '../components/Header.jsx';
import Login from '../pages/IniciarSesion.jsx';
import Register from '../pages/CrearCuenta.jsx';

function AppRoute() {

  return (
    <>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default AppRoute;