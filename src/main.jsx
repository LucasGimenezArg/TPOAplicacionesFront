import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Login from './Page/IniciarSesion'
import Crear from './Page/CrearCuenta'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login/>
  </StrictMode>,
)
