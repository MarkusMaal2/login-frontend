import React from "react";
import FormButton from "../LoginForm/FormButton";
import Header from "./Header";
import TextField from "../LoginForm/TextField";

const UpdateInfo = (props) => {
    return (<>
        <Header label={`Andmete muutmine`}></Header>
        <div className="container mt-5">
        <form>
            <TextField id="userName" type="text" label="Kasutajanimi"  value={props.newUserName} onChange={props.onUserChange}></TextField>
            <TextField id="passWord" type="password" label="Parool"  value={props.newPassWord} onChange={props.onPassChange}></TextField>
                { props.error ? <div style={{color: "red"}}>{props.error}</div> : "" }
                <FormButton handler={props.backHandler} text={"Tagasi"}></FormButton>
                <FormButton handler={props.submitHandler} text={"Kinnita"}></FormButton>
        </form>
        </div></>);
}

export default UpdateInfo