import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { getTransaccionesPorUsuario } from '../services/serviceTransacciones';
import { getUsuarioPorId } from '../services/serviceUsuarios';
import { getHistory } from '../services/serviceCarrito';

const MiPerfil = () => {
    const [usuario, setUsuario] = useState(null);
    const [transacciones, setTransacciones] = useState([]);
    const [visibleCount, setVisibleCount] = useState(2); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setUsuario(JSON.parse(localStorage.getItem('usuario')));
    }, []);

    const handleShowMore = () => setVisibleCount(prevCount => prevCount + 2);

    return (
        <div className="container my-4">
            <h1>Tu perfil</h1>
            {usuario ? (
                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title>Datos del usuario</Card.Title>
                        <Card.Text>
                            <strong>Nombre:</strong> {usuario.nombre}<br />
                            <strong>Apellido:</strong> {usuario.apellido}<br />
                            <strong>Mail:</strong> {usuario.mail}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <p>No se encontró información del usuario</p>
            )}

            <h2>Transacciones</h2>
            {transacciones.length > 0 ? (
                <div className="d-flex flex-column">
                    {transacciones.slice(0, visibleCount).map((transaccion) => (
                        <Card key={transaccion.id} className="mb-3">
                            <Card.Body>
                                <Card.Title>Fecha: {new Date(transaccion.timestamp).toLocaleString()}</Card.Title>
                                <Card.Text>
                                    <strong>Carrito:</strong>
                                    <ul>
                                        {transaccion.items.map((item, index) => (
                                            <li key={index}>
                                                {item.cantidad} x {item.producto.descripcion} - ${item.producto.precio.toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                    Total: {transaccion.items.reduce((subtotal, current) => subtotal + (current.cantidad * current.producto.precio), 0).toFixed(2)}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                    {visibleCount < transacciones.length && (
                        <Button variant="outline-info" onClick={handleShowMore} className="mt-3">
                            Cargar más
                        </Button>
                    )}
                </div>
            ) : (
                <p>No hay transacciones disponibles</p>
            )}
        </div>
    );
};

export default MiPerfil;
