import { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaCalendar } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';
import axios from 'axios'; 

const Crear = () => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [repetirContrasena, setRepetirContrasena] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [mail, setMail] = useState('');
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        // Validación de contraseñas
        if (contrasena !== repetirContrasena) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        // Resetea el error y mensaje
        setError('');
        setMensaje('');

        // Validación de la fecha (asegurarse que esté en formato 'YYYY-MM-DD')
        const fechaValida = new Date(fechaNacimiento);
        if (isNaN(fechaValida.getTime())) {
            setError("Fecha de nacimiento inválida.");
            return;
        }

        // Lógica para crear el usuario con axios
        try {
            const response = await axios.post('http://localhost:8080/api/usuario/normal', {
                nombreUsuario: nombreUsuario,  
                contrasena: contrasena,         
                nombre: nombre,                 
                apellido: apellido,             
                fechaNacimiento: fechaValida,
                mail: mail                      
            });

            console.log('Respuesta:', response);

            if (response.status === 200) {
                setMensaje("Cuenta creada con éxito.");
                // Limpia los campos después de la creación de la cuenta
                setNombreUsuario('');
                setContrasena('');
                setRepetirContrasena('');
                setNombre('');
                setApellido('');
                setFechaNacimiento('');
                setMail('');
            } else {
                setError("Error al crear la cuenta. Inténtalo nuevamente.");
            }
        } catch (error) {
            // Manejo del error y mostrar detalles
            console.error('Error al conectar con el servidor:', error);

            // Si el error tiene respuesta del servidor
            if (error.response) {
                setError("Usuario o mail ya existen.");
            } else {
                // Error en la conexión, sin respuesta del servidor
                setError("Error al conectar con el servidor. Intenta nuevamente.");
            }
        }
    };

    return (
        <div className="wrapper d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={onSubmit} className="p-4 shadow-lg rounded bg-light" style={{ maxWidth: "400px", width: "100%" }}>
                <h1 className="text-center mb-4">Crear cuenta</h1>

                {error && <p className="text-danger text-center">{error}</p>}
                {mensaje && <p className="text-success text-center">{mensaje}</p>}

                <div className="input-group mb-3">
                    <span className="input-group-text"><FaUser /></span>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Usuario" 
                        value={nombreUsuario} 
                        onChange={(e) => setNombreUsuario(e.target.value)} 
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
                        onChange={(e) => setContrasena(e.target.value)} 
                        required 
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text"><FaLock /></span>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Repetir contraseña" 
                        value={repetirContrasena} 
                        onChange={(e) => setRepetirContrasena(e.target.value)} 
                        required 
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text"><FaUser /></span>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nombre" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text"><FaUser /></span>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Apellido" 
                        value={apellido} 
                        onChange={(e) => setApellido(e.target.value)} 
                        required 
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text"><FaCalendar /></span>
                    <input 
                        type="date" 
                        className="form-control" 
                        placeholder="Fecha de Nacimiento" 
                        value={fechaNacimiento} 
                        onChange={(e) => setFechaNacimiento(e.target.value)} 
                        required 
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text"><FaEnvelope /></span>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Correo Electrónico" 
                        value={mail} 
                        onChange={(e) => setMail(e.target.value)} 
                        required 
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Crear</button>
            </form>
        </div>
    );
}

export default Crear;
