import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { getTransaccionesPorUsuario } from '../services/serviceTransacciones';
import { getUsuarioPorId } from '../services/serviceUsuarios';

const MiPerfil = ({ usuarioId }) => {
    const [usuario, setUsuario] = useState(null);
    const [transacciones, setTransacciones] = useState([]);
    const [visibleCount, setVisibleCount] = useState(2); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUsuario = await getUsuarioPorId(usuarioId);
                setUsuario(fetchedUsuario);

                const fetchedTransacciones = await getTransaccionesPorUsuario(usuarioId);
                setTransacciones(fetchedTransacciones);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (usuarioId) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [usuarioId]);

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
                                <Card.Title>Fecha: {transaccion.fecha}</Card.Title>
                                <Card.Text>
                                    <strong>Carrito:</strong>
                                    <ul>
                                        {transaccion.carrito.map((item, index) => (
                                            <li key={index}>
                                                {item.cantidad} x {item.producto} - ${item.precio.toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
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
