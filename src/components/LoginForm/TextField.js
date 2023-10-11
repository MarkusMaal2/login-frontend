import React from "react";
import Form from 'react-bootstrap/Form';

const TextField = (props) => {
    return (
        <Form.Group className="mb-3" controlId={props.id}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type={props.type} placeholder={props.placeholder}></Form.Control>
        </Form.Group>
    )
}

export default TextField