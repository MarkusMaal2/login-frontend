import React, {useState} from "react";
import FormButton from "../LoginForm/FormButton";
import Header from "./Header";

const EditNote = (props) => {
    const [content, setContent] = useState(props.note.CONTENT);
    const setValue = (e) => {
        setContent(e.target.value);
        props.note.CONTENT = content;
    }
    if (!props.note) {
        return "";
    }
    //console.log(props.note.id);
    return (
        <>
            <Header label={"Märkme muutmine (ID: " + props.note.id + ")"}></Header>
            <form className={"pt-3"}>
                <div className={"rounded-3 mb-3 border border-secondary mx-0"}>
                    <textarea className={"form-control p-3"} value={content} onChange={setValue}></textarea>
                    <div className={"rounded-bottom-3 background-dark position-relative pb-5"} note_id={props.note.id}>
                        <FormButton handler={props.confirmHandler} text={"Kinnita"} variant={"success"} className={"position-absolute top-0 end-0 mt-1"}></FormButton>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditNote;