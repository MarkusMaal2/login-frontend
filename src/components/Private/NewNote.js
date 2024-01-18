import React from "react";
import FormButton from "../LoginForm/FormButton";
import Header from "./Header";

const NewNote = (props) => {
    return (
        <>
            <Header label={"Märkme lisamine"}></Header>
            <form className={"pt-3"}>
                <div className={"rounded-3 mb-3 border border-primary-subtle mx-0"}>
                    <textarea className={"form-control p-3"} id={"noteContent"}></textarea>
                    <div className={"rounded-bottom-3 text-bg-light position-relative pb-5"}>
                        <FormButton handler={props.confirmHandler} text={"Lisa märge"} variant={"success"} className={"position-absolute top-0 end-0 mt-1"}></FormButton>
                    </div>
                </div>
            </form>
        </>
    )
}

export default NewNote;