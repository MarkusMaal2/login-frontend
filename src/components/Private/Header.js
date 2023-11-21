import React from "react";
import FormButton from "../LoginForm/FormButton";

const Header = (props) => {
    return (
        <nav className="navbar navbar-light bg-light p-3">
            <a className="navbar-brand col-lg-12 text-center" href="#">{props.label}</a>
        </nav>
    )
}

export default Header;