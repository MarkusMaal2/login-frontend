import React from "react";
import Button from 'react-bootstrap/Button';

const FormButton = (props) => {
    return (

        <Button className="me-2" onClick={props.handler} variant={props.variant} type="submit">
            {props.text}
        </Button>
    )
}

export default FormButton;