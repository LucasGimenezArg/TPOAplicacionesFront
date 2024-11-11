import {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import {Cart, CartFill} from 'react-bootstrap-icons';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import {Image, ListGroup} from "react-bootstrap";
import {addOrUpdateItemCarrito, checkout, removeItemCarrito} from "../services/serviceCarrito.js";
import ConfirmationDialog from "./ConfirmationDialog.jsx";
import NumericInput from "./NumericInput.jsx";

export default function Carrito({isLoggedIn, items, refresh}) {
    const [isVisible, setIsVisible] = useState(false);
    const [stateDeleteDialog, setStateDeleteDialog] = useState({visible: false});
    const [stateCheckoutDialog, setStateCheckoutDialog] = useState({visible: false});

    useEffect(() => {
        (async function fetchData() {
            await refresh();
        })();
    }, [isLoggedIn, refresh]);

    const modifyItem = async (item, newCantidad) => {
        if (newCantidad >= 1) {
            await addOrUpdateItemCarrito({...item, cantidad: newCantidad});
        } else {
            await removeItemCarrito(item.id);
        }
        await refresh();
    }

    const doCheckout = async () => {
        await checkout()
            .then(() => {
                setStateCheckoutDialog({...stateCheckoutDialog, visible: false});
                setIsVisible(false);
            })
            .finally(() => refresh());
    }

    return (
        <>
            <Button variant="primary" onClick={() => setIsVisible(true)}>
                {items.length > 0
                    ? <>
                        <CartFill/>
                        <Badge pill bg="danger">
                            {items.map(i => i.cantidad).reduce((acc, current) => acc + current)}
                        </Badge>
                    </>
                    : <Cart/>}
            </Button>
            <Modal show={isVisible} onHide={() => setIsVisible(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Carrito</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {items.map(item =>
                            <ListGroup.Item key={item.id}>
                                <Image
                                    src={item.producto.direccionImagenes.length > 0 ? item.producto.direccionImagenes : '/noImg.jpg'}
                                    width="50" height="50"></Image>
                                {item.producto.descripcion}
                                <NumericInput minValue={1}
                                              value={item.cantidad}
                                              maxValue={item.producto.stock}
                                              onChange={(newValue) => modifyItem(item, newValue)}
                                              onDelete={() => setStateDeleteDialog({
                                                  visible: true,
                                                  item: item
                                              })}/>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setStateCheckoutDialog({
                        ...stateCheckoutDialog,
                        visible: true
                    })}>Checkout</Button>
                </Modal.Footer>
            </Modal>
            {/* Modal de confirmación para confirmar el carrito y hacer Checkout */}
            <ConfirmationDialog visible={stateCheckoutDialog.visible}
                                title='¿Desea confirmar el carrito?'
                                onClose={() => setStateCheckoutDialog({...stateCheckoutDialog, visible: false})}
                                onConfirm={() => doCheckout()}>
                <ListGroup>
                    {items.map(item => <ListGroup.Item key={item.id}>
                        {item.producto.descripcion} ({item.cantidad} x ${item.producto.precio}) – ${item.producto.precio * item.cantidad}
                    </ListGroup.Item>)}
                    <ListGroup.Item>
                        <strong>TOTAL:
                            ${items.reduce((subtotal, current) => subtotal + (current.cantidad * current.producto.precio), 0)}</strong>
                    </ListGroup.Item>
                </ListGroup>
            </ConfirmationDialog>

            {/* Modal de confirmación para borrar un item del carrito */}
            <ConfirmationDialog visible={stateDeleteDialog.visible}
                                onClose={() => setStateDeleteDialog({...stateDeleteDialog, visible: false})}
                                onConfirm={() => modifyItem(stateDeleteDialog.item, 0)
                                    .then(() => setStateDeleteDialog({
                                        ...stateDeleteDialog,
                                        visible: false
                                    }))}>
                ¿Desea quitar <strong>{stateDeleteDialog.item?.producto.descripcion}</strong> del carrito?
            </ConfirmationDialog>
        </>
    );
}
