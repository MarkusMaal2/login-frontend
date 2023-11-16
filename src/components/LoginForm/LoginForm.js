import React from "react";
import Form from 'react-bootstrap/Form';
import TextField from "./TextField";
import FormButton from "./FormButton";

const LoginForm = (props) => {
    return (
        <Form onSubmit={props.submitHandler}>
            { props.error ? <div style={{color: "red"}}>{props.error}</div> : "" }
            <TextField id="userName" type="text" label="Kasutajanimi" placeholder="" value={props.userName}></TextField>
            <TextField id="passWord" type="password" label="Parool"  placeholder="" value={props.passWord}></TextField>
            <FormButton handler={props.loginHandler} variant="primary" text="Logi sisse"></FormButton>
            <FormButton handler={props.regHandler} variant="primary" text="Registreeri"></FormButton>
        </Form>
    )
}

export default LoginForm