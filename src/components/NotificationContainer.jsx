import {Toast, ToastContainer} from "react-bootstrap";
import {useState} from "react";
import NotificationManager from "../services/NotificationManager.js";
import {ExclamationTriangleFill, InfoCircle} from "react-bootstrap-icons";

export default function NotificationContainer() {
    const [notifications, setNotifications] = useState([]);
    const [stateMap, setStateMap] = useState({});

    NotificationManager.init((notifications, newKey) => {
        if (newKey) {
            setStateMap({...stateMap, [newKey]: true});
        }
        setNotifications(notifications);
    });

    const onClose = (key) => {
        setStateMap({...stateMap, [key]: false});
        NotificationManager.INSTANCE.dismiss(key);
    }

    return <ToastContainer position='bottom-end' className='position-fixed' style={{zIndex: 1}}>
            {notifications.map(n =>
                <Toast key={n.key}
                       show={stateMap[n.key]}
                       onClose={() => onClose(n.key)}
                       delay={3000}
                       autohide>
                    <Toast.Header><strong className='me-auto'>{n.isError ? <ExclamationTriangleFill /> : <InfoCircle />} {n.title}</strong></Toast.Header>
                    <Toast.Body>{n.message}</Toast.Body>
                </Toast>)}
        </ToastContainer>;
}