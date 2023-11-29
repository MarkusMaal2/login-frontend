import React from "react";
import Button from 'react-bootstrap/Button';

const FormButton = (props) => {
    let style = "me-2"
    if (props.className) {
        style = style + " " + props.className
    }
    return (

        <Button className={style} onClick={props.handler} variant={props.variant} type="submit">
            {props.text}
        </Button>
    )
}

export default FormButton;