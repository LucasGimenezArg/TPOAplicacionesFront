import {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import {Cart, CartCheck, CartFill, CartX} from 'react-bootstrap-icons';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import {Image, ListGroup} from "react-bootstrap";
import {addOrUpdateItemCarrito, checkout, clearCarrito, removeItemCarrito} from "../services/serviceCarrito.js";
import ConfirmationDialog from "./ConfirmationDialog.jsx";
import NumericInput from "./NumericInput.jsx";

export default function Carrito({items, loggedUser, refresh}) {
    const [isVisible, setIsVisible] = useState(false);
    const [stateDeleteDialog, setStateDeleteDialog] = useState({visible: false});
    const [stateCheckoutDialog, setStateCheckoutDialog] = useState({visible: false});
    const [showClearDialog, setShowClearDialog] = useState(false);
    const [itemsCount, setItemsCount] = useState(0);

    useEffect(() => setItemsCount(items.map(i => i.cantidad).reduce((acc, current) => acc + current, 0)), [items]);

    const modifyItem = async (item, newCantidad) => {
        if (newCantidad >= 1) {
            await addOrUpdateItemCarrito({...item, usuario: loggedUser, cantidad: newCantidad});
        } else {
            await removeItemCarrito(item.id);
        }
        await refresh();
    }

    const vaciarCarrito = async () => {
        await clearCarrito(loggedUser);
        setShowClearDialog(false);
        setIsVisible(false);
        await refresh();
    }

    const doCheckout = async () => {
        await checkout(loggedUser)
            .then(() => {
                setStateCheckoutDialog({...stateCheckoutDialog, visible: false});
                setIsVisible(false);
            })
            .finally(() => refresh());
    }

    const doRemove = async (item) => {
        await modifyItem(item, 0);
        setStateDeleteDialog({
            ...stateDeleteDialog,
            visible: false
        });
        if (items.length > 0) {
            setIsVisible(false);
        }
    }


    return (
        <>
            <Button variant="primary" disabled={items.length === 0} onClick={() => setIsVisible(true)}>
                {items.length > 0
                    ? <>
                        <CartFill/>
                        <Badge pill bg="danger">
                            {itemsCount}
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
                                    src={item.producto.direccionImagenes.length > 0 ? item.producto.direccionImagenes[0] : '/noImg.jpg'}
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
                    <Button variant='outline-primary' onClick={() => setShowClearDialog(true)}><CartX/> Vaciar
                        carrito</Button>
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
                        {item.producto.descripcion} ({item.cantidad} x ${item.producto.precio}) –
                        ${item.producto.precio * item.cantidad}
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
                                onConfirm={() => doRemove(stateDeleteDialog.item)}>
                ¿Desea quitar <strong>{stateDeleteDialog.item?.producto.descripcion}</strong> del carrito?
            </ConfirmationDialog>

            {/* Modal de confirmación para vaciar carrito */}
            <ConfirmationDialog visible={showClearDialog}
                                onClose={() => setShowClearDialog(false)}
                                onConfirm={() => vaciarCarrito()}>
                ¿Desea vaciar el carrito?
            </ConfirmationDialog>
        </>
    );
}
