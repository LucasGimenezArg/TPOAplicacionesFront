import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Header from '../components/Header.jsx';
import Login from '../pages/IniciarSesion.jsx';
import Register from '../pages/CrearCuenta.jsx';
import Productos from '../pages/Productos.jsx';
import GestionProductos from '../pages/GestionProductos.jsx';
import DetalleProducto from '../pages/DetalleProducto.jsx';
import {getItemsCarrito} from "../services/serviceCarrito.js";
import NotificationContainer from "../components/NotificationContainer.jsx";
import MiPerfil from '../pages/MiPerfil.jsx';
import Cookies from 'js-cookie';

function AppRoute() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState();
  const [itemsCarrito, setItemsCarrito] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      setisLoggedIn(true);
    }
  }, []);

  const refreshCarrito = async (usuario) => (isLoggedIn || usuario) && setItemsCarrito(await getItemsCarrito(usuario ?? loggedUser));

  const handleLogin = async (usuario) => {
    setisLoggedIn(true);
    setLoggedUser(usuario);
    setUsuarioId(usuario.idUsuario);
    //await refreshCarrito(usuario);
  }

  const handleLogout = () => {
    Cookies.remove("jwt");
    setisLoggedIn(false);
    setLoggedUser(undefined);
  }

  return (
    <>
      <Header isLoggedIn = {isLoggedIn} handleLogout = {handleLogout} loggedUser={loggedUser} itemsCarrito={itemsCarrito} refreshCarrito={refreshCarrito}/>
      <Routes>
          <Route path="/" element={<Home isLoggedIn = {isLoggedIn} loggedUser={loggedUser} itemsCarrito={itemsCarrito} refreshCarrito={refreshCarrito}/>} />
          <Route path="/login" element={<Login handleLogin = {handleLogin}/>} />
          <Route path="/register" element={<Register handleLogin = {handleLogin} />} />
          <Route path="/productos" element={<Productos isLoggedIn = {isLoggedIn} loggedUser={loggedUser} itemsCarrito={itemsCarrito} refreshCarrito={refreshCarrito} />} />
          <Route path="/producto/:id" element={<DetalleProducto isLoggedIn = {isLoggedIn} loggedUser={loggedUser} itemsCarrito={itemsCarrito} refreshCarrito={refreshCarrito} />} />
          <Route path="/gestionProductos" element={<GestionProductos isLoggedIn = {isLoggedIn} />} />
          <Route path="/perfil" element={<MiPerfil />} />
      </Routes>
      <NotificationContainer />
    </>
  )
}

export default AppRoute;