
import { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaCalendar } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';

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

        // Lógica para crear el usuario
        try {
            const response = await fetch('http://localhost:3001/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario: nombreUsuario,
                    contrasena: contrasena,
                    nombre: nombre,
                    apellido: apellido,
                    fecha_nacimiento: fechaNacimiento,
                    mail: mail,
                    tipo_usuario: 'UsuarioNormal' 
                }),
            });

            if (response.ok) {
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
            setError("Error al conectar con el servidor.");
            console.error("Error:", error);
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
