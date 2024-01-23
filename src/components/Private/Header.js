import React from "react";

const Header = (props) => {
    return (
        <nav className="navbar navbar-dark p-3">
            <button className="dummy-button navbar-brand col-lg-12 text-center" onClick={props.onReturnHome}>{props.label}</button>
        </nav>
    )
}

export default Header;