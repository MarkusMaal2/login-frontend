import React from "react";
import FormButton from "../LoginForm/FormButton";
import Header from "./Header";
import UpdateInfo from "./UpdateInfo";

const Private = (props) => {
    switch (props.screen) {
        case "Info":
            return (<>
                <Header label={`Tere tulemast, ${props.data.name}!`}></Header>
                <div className="container mt-5">
                    { props.error ? <div style={{color: "red"}}>{props.error}</div> : "" }
                    <p>Andmebaasi ID: {props.data.id}</p>
                    <p>Sessioni ID: {props.data.token}</p>
                    <p>Parooli räsi: {props.data.hash}</p>
                    <FormButton handler={props.logoutHandler} text={"Logi välja"}></FormButton>
                    <FormButton handler={props.screenHandler} text={"Muuda infot"}></FormButton>
                    <FormButton handler={props.deleteHandler} text={"Kustuta konto"}></FormButton>
                </div></>);
        case "EditInfo":
            return <UpdateInfo backHandler={props.screenHandler} data={props.data} submitHandler={props.updateHandler} newUserName={props.newUserName} newPassWord={props.newPassWord} onUserChange={props.onUserChange} onPassChange={props.onPassChange}></UpdateInfo>;
        default:
            return (<></>)
    }
}

export default Private;