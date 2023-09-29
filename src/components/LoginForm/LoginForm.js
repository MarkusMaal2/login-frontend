import React from "react";
import Form from 'react-bootstrap/Form';
import TextField from "./TextField";
import FormButton from "./FormButton";

const LoginForm = (props) => {
    return (
        <Form onSubmit={props.submitHandler}>
            <TextField id="userName" type="text" label="Kasutajanimi" placeholder=""></TextField>
            <TextField id="passWord" type="password" label="Parool"  placeholder=""></TextField>
            <FormButton handler={props.loginHandler} variant="primary" text="Logi sisse"></FormButton>
            <FormButton handler={props.regHandler} variant="primary" text="Registreeri"></FormButton>
        </Form>
    )
}

export default LoginForm