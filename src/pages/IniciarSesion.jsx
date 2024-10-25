
import { FaUser } from "react-icons/fa"
import { FaLock } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';


const Login = ({handleLogin}) => {
    const navigate = useNavigate();

    const onSubmit = (e) => { 
        e.preventDefault();
        handleLogin();
        navigate('/');
    }

    return (
        <div className="wrapper d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={onSubmit} className="p-4 shadow-lg rounded bg-light" style={{ maxWidth: "400px", width: "100%" }}>
                <h1 className="text-center mb-4">Iniciar sesion</h1>

                <div className="input-group mb-3">
                    <span className="input-group-text"><FaUser /></span>
                    <input type="text" className="form-control" placeholder="Usuario" required />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text"><FaLock /></span>
                    <input type="password" className="form-control" placeholder="Contraseña" required />
                </div>

                <button type="submit" className="btn btn-primary w-100">Iniciar</button>

                <div className="text-center mt-3">
                    <p>No tienes una cuenta? <a href="#">Regístrate</a></p>
                </div>
            </form>
        </div>
    )
}

export default Login;