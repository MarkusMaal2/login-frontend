import React from "react";
import Form from 'react-bootstrap/Form';
import TextField from "./TextField";
import FormButton from "./FormButton";
import Header from "../Private/Header";

const LoginForm = (props) => {
    return (
        <>
            <Header label={"Sisselogimine"} onReturnHome={props.returnHome}></Header>
            <Form onSubmit={props.submitHandler}>
                { props.error ? <div style={{color: "red"}}>{props.error}</div> : "" }
                <TextField id="userName" type="text" label="Kasutajanimi" placeholder="" value={props.userName} onChange={props.onUserChange}></TextField>
                <TextField id="passWord" type="password" label="Parool"  placeholder="" value={props.passWord} onChange={props.onPassChange}></TextField>
                <FormButton handler={props.loginHandler} variant="primary" text="Logi sisse"></FormButton>
                <FormButton handler={props.regHandler} variant="primary" text="Registreeri"></FormButton>
            </Form>
        </>
    )
}

export default LoginForm