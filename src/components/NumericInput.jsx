import Button from "react-bootstrap/Button";
import {DashLg, PlusLg, Trash} from "react-bootstrap-icons";
import {Form, InputGroup} from "react-bootstrap";

export default function NumericInput({
                                         label,
                                         value,
                                         maxValue = Number.MAX_VALUE,
                                         minValue = Number.MIN_VALUE,
                                         onChange,
                                         onDelete
                                     }) {
    return <>
        {label && <Form.Label>{label}</Form.Label>}
        <InputGroup>
            <Button
                variant={(onDelete && value === minValue) ? 'outline-danger' : 'outline-primary'}
                disabled={!onDelete && value === minValue}
                onClick={() => (onDelete && value === minValue) ? onDelete() : onChange(value - 1)}>
                {(onDelete && value === minValue) ? <Trash/> : <DashLg/>}
            </Button>
            <InputGroup.Text>{value}</InputGroup.Text>
            <Button variant='outline-primary'
                    disabled={value === maxValue}
                    onClick={() => onChange(value + 1)}><PlusLg/></Button>
        </InputGroup>
    </>;
}