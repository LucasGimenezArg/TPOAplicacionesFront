import { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';

const Login = ({ handleLogin }) => {
    const navigate = useNavigate();
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:3001/usuario?nombre_usuario=${nombreUsuario}`);
            const usuarios = await response.json();
            
            if (usuarios.length > 0) {
                const usuario = usuarios[0]; 
                
                if (contrasena === usuario.contrasena) {  
                    handleLogin(usuario); 
                    navigate('/'); 
                } else {
                    setError("Contraseña incorrecta.");
                }
            } else {
                setError("Usuario no encontrado.");
            }
        } catch (error) {
            setError("Error al intentar iniciar sesión.");
            console.error("Error:", error);
        }
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        // Reseteamos el error cada vez que el usuario cambia los datos
        if (error) {
            setError('');
        }
    };

    const redirectToHome = () => {
        navigate('/register'); 
    };

    return (
        <div className="wrapper d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={onSubmit} className="p-4 shadow-lg rounded bg-light" style={{ maxWidth: "400px", width: "100%" }}>
                <h1 className="text-center mb-4">Iniciar sesión</h1>

                {error && <p className="text-danger text-center">{error}</p>}

                <div className="input-group mb-3">
                    <span className="input-group-text"><FaUser /></span>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Usuario" 
                        value={nombreUsuario} 
                        onChange={handleInputChange(setNombreUsuario)} 
                        required 
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text"><FaLock /></span>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Contraseña" 
                        value={contrasena} 
                        onChange={handleInputChange(setContrasena)} 
                        required 
                    />
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary w-100" 
                    disabled={!nombreUsuario || !contrasena || error}
                >
                    Iniciar
                </button>

                <div className="text-center mt-3">
                    <p>No tienes una cuenta? 
                        <button type="button" onClick={redirectToHome} className="btn btn-link p-0">Regístrate</button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
