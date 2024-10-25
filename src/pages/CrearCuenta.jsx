
import { FaUser, FaLock } from "react-icons/fa"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';

const Crear = () => {
    return (
        <div className="wrapper d-flex justify-content-center align-items-center vh-100">
            <form action="" className="p-4 shadow-lg rounded bg-light" style={{ maxWidth: "400px", width: "100%" }}>
                <h1 className="text-center mb-4">Crear cuenta</h1>

                <div className="input-group mb-3">
                    <span className="input-group-text"><FaUser /></span>
                    <input type="text" className="form-control" placeholder="Usuario" required />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text"><FaLock /></span>
                    <input type="password" className="form-control" placeholder="Contraseña" required />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text"><FaLock /></span>
                    <input type="password" className="form-control" placeholder="Repetir contraseña" required />
                </div>

                <button type="submit" className="btn btn-primary w-100">Crear</button>


            </form>
        </div>
    )
}

export default Crear;