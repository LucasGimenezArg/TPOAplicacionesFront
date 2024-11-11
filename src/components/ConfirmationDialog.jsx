import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ConfirmationDialog({visible, title, onConfirm, onClose, children}) {
    return <Modal centered show={ visible }
                  onHide={ onClose }>
        <Modal.Header closeButton>
            { title && <Modal.Title>{ title }</Modal.Title>}
        </Modal.Header>
        <Modal.Body>{ children }</Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={ onConfirm }>Aceptar</Button>
            <Button
                onClick={ onClose }>Cancelar</Button>
        </Modal.Footer>
    </Modal>;
}