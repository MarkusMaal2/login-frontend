import React from "react";
import FormButton from "../LoginForm/FormButton";

const Private = (props) => {
    console.log(props);
    return (
        <div className="container mt-5">
            <h2>Tere tulemast, {props.data.name}!</h2>
            <p>Andmebaasi ID: {props.data.id}</p>
            <p>Sessioni ID: {props.data.token}</p>
            <p>Parooli räsi: {props.data.hash}</p>
            <FormButton handler={props.logoutHandler} text={"Logi välja"}></FormButton>
            <FormButton handler={props.deleteHandler} text={"Kustuta konto"}></FormButton>
        </div>
    )
}

export default Private;