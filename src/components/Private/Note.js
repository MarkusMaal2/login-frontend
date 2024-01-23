import React from "react";
import FormButton from "../LoginForm/FormButton";

const Note = (props) => {
    if (!props.note) {
        return "";
    }
    //console.log(props.note.id);
    return (
        <div className={"rounded-3 mb-3 border border-primary-subtle mx-0"} style={"border-color: #8464a2 !important;"}>
            <div className={"text-bg-primary rounded-top-3 text-center note-header"} style={"background-color: #8464a2 !important;"}><p className={"p-2"}>Muudetud: {props.note.MODIFIED}</p>
            </div>
            <p className={"px-3"}>{nl2br(props.note.CONTENT)}</p>
            <div className={"rounded-bottom-3 text-bg-light position-relative pb-5"} note_id={props.note.id}>
                <FormButton handler={props.deleteHandler} text={"Kustuta"} variant={"danger"} className={"position-absolute top-0 end-0 mt-1"}></FormButton>
                <FormButton handler={props.deleteHandler} text={"Muuda"} className={"position-absolute top-0 ms-2 mt-1"}></FormButton>
            </div>
        </div>
    )
}

const nl2br = (data) => {
    return data.split("\n").map(function(item, idx) {
        return (
            <span key={idx}>
                {item}
                <br/>
            </span>
        )
    })
}

export default Note;