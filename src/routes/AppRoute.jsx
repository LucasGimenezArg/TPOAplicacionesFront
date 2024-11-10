import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Header from '../components/Header.jsx';
import Login from '../pages/IniciarSesion.jsx';
import Register from '../pages/CrearCuenta.jsx';
import Productos from '../pages/Productos.jsx'
import GestionProductos from '../pages/GestionProductos.jsx';
import DetalleProducto from '../pages/DetalleProducto.jsx';

function AppRoute() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const handleLogin = () => {
    setisLoggedIn(true);
  }

  const handleLogout = () => {
    setisLoggedIn(false);
  }

  return (
    <>
      <Header isLoggedIn = {isLoggedIn} handleLogout = {handleLogout}/>
      <Routes>
          <Route path="/" element={<Home isLoggedIn = {isLoggedIn}/>} />
          <Route path="/login" element={<Login handleLogin = {handleLogin}/>} />
          <Route path="/register" element={<Register handleLogin = {handleLogin} />} />
          <Route path="/productos" element={<Productos isLoggedIn = {isLoggedIn} />} />
          <Route path="/producto/:id" element={<DetalleProducto isLoggedIn = {isLoggedIn} />} />
          <Route path="/gestionProductos" element={<GestionProductos isLoggedIn = {isLoggedIn} />} />
      </Routes>
    </>
  )
}

export default AppRoute;