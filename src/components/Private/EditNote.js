import React from "react";
import FormButton from "../LoginForm/FormButton";
import Header from "./Header";

const EditNote = (props) => {
    if (!props.note) {
        return "";
    }
    //console.log(props.note.id);
    return (
        <>
            <Header label={"Märkme muutmine (ID: " + props.note.id + ")"}></Header>
            <form className={"pt-3"}>
                <div className={"rounded-3 mb-3 border border-primary-subtle mx-0"}>
                    <textarea className={"form-control p-3"}>{props.note.CONTENT}</textarea>
                    <div className={"rounded-bottom-3 text-bg-light position-relative pb-5"} note_id={props.note.id}>
                        <FormButton handler={props.confirmHandler} text={"Kinnita"} variant={"success"} className={"position-absolute top-0 end-0 mt-1"}></FormButton>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditNote;