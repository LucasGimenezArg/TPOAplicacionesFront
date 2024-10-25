import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, handleLogout }) => {
    return (
        <header>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">Eccomerce App</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
                        <Nav.Link as={Link} to="/gestionProductos">Gestion Productos</Nav.Link>
                    </Nav>
                    {isLoggedIn ? (
                        <Nav>
                            <Nav.Link as={Link} to="/perfil">Perfil</Nav.Link>
                            <Nav.Link onClick={handleLogout} as={Link} to="/">Cerrar Sesion</Nav.Link>
                        </Nav>
                    ) : (
                        <Nav>
                            <Nav.Link as={Link} to="/login">Iniciar Sesion</Nav.Link>
                            <Nav.Link as={Link} to="/register">Crear Cuenta</Nav.Link>
                        </Nav>
                    )}
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;