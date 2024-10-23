import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Eccomerce App</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/productos">Productos</Nav.Link>
                        <Nav.Link href="/gestionProductos">Gestion Productos</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login">Iniciar Sesion</Nav.Link>
                        <Nav.Link href="/register">Crear Cuenta</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;