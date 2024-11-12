import {InputGroup, ListGroup, Nav, Tab, Table, Tabs} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {CalendarCheck, ChevronLeft, ChevronRight, ClockHistory, DashLg, PlusLg, Trash} from "react-bootstrap-icons";
import {getHistory} from "../services/serviceCarrito.js";
import Button from "react-bootstrap/Button";

export default function Perfil({isLoggedIn}) {
    const [historial, setHistorial] = useState({});
    const [usuario, setUsuario] = useState(null);
    const [page, setPage] = useState(0);
    const pageSize = 10;

    useEffect(() => {
        (async () => {
            setUsuario(JSON.parse(localStorage.getItem('usuario')));
            setPage(0);
            if (isLoggedIn) {
                setHistorial(await getHistory(page, pageSize));
            }
        })();
    }, [isLoggedIn]);

    const changePage = async (offset) => {
        setHistorial(await getHistory(page + offset, pageSize));
        setPage(page + offset);
    }

    return <>
        <h2 className="text-center mt-5">Mi Perfil</h2>
        {!isLoggedIn ?
            <div className="alert alert-danger text-center m-5" role="alert">
                <h3>Tenés que loguearte para acceder a esta funcionalidad</h3>
                <button type="button" className="btn btn-dark">
                    <Nav.Link as={Link} to="/login">
                        Iniciar Sesión
                    </Nav.Link>
                </button>
            </div>
            :
            <div className='m-5'>
                <h3>Bienvenido/a, <em>{usuario.nombreUsuario}</em></h3>
                <Tabs className="mt-4">
                    <Tab eventKey="datos" title="Datos Personales">
                        <ListGroup>
                            <ListGroup.Item><strong>Nombre:</strong> {usuario.nombre}</ListGroup.Item>
                            <ListGroup.Item><strong>Apellido:</strong> {usuario.apellido}</ListGroup.Item>
                            <ListGroup.Item><strong>Fecha de nacimiento:</strong> {usuario.fechaNacimiento}
                            </ListGroup.Item>
                            <ListGroup.Item><strong>E-Mail:</strong> {usuario.mail}</ListGroup.Item>
                        </ListGroup>
                    </Tab>
                    <Tab eventKey="historial" title="Historial de compras">
                        <div className="d-flex justify-content-between align-items-center">
                            <InputGroup className="justify-content-end">
                                <InputGroup.Text>Página: </InputGroup.Text>
                                <Button
                                    variant="secondary-outline"
                                    disabled={page === 0}
                                    onClick={async () => changePage(-1)}>
                                    <ChevronLeft/>
                                </Button>
                                <InputGroup.Text>{page + 1} / {historial.totalPages}</InputGroup.Text>
                                <Button variant='secondary-outline'
                                        disabled={page === historial.totalPages - 1}
                                        onClick={() => changePage(1)}><ChevronRight/></Button>
                            </InputGroup>
                        </div>
                        <ListGroup>
                            {historial.items && historial.items.length > 0 ?
                                historial.items.map((compra) => <ListGroup.Item key={compra.id}>
                                    <em><CalendarCheck/> {new Date(compra.fecha).toLocaleString()}</em>
                                    <Table striped bordered>
                                        <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Precio Unitario</th>
                                            <th>Cantidad</th>
                                            <th>Subtotal</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {compra.items.map((item) => <tr key={item.id}>
                                            <td>{item.producto.descripcion}</td>
                                            <td>${item.producto.precio}</td>
                                            <td>{item.cantidad}</td>
                                            <td>${item.cantidad * item.producto.precio}</td>
                                        </tr>)}
                                        <tr>
                                            <td colSpan={3}><strong>Total</strong></td>
                                            <td>${compra.items.reduce((subtotal, current) => subtotal + (current.cantidad * current.producto.precio), 0)}</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </ListGroup.Item>)
                                : <div className="alert alert-light text-center text-muted m-5" role="alert">
                                    <h3>No posee compras realizadas a la fecha</h3>
                                    <h1><ClockHistory/></h1>
                                </div>}
                        </ListGroup>

                    </Tab>
                </Tabs>
            </div>
        }
    </>;
}