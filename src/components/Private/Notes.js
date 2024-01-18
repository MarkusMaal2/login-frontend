import React, {useState} from "react";
import Header from "./Header";
import FormButton from "../LoginForm/FormButton";
import Note from "./Note";
import EditNote from "./EditNote";
import axios from "axios";


const Notes = (props) => {
    const [noteScreen, setNoteScreen] = useState("default");
    const [modNote, setModNote] = useState()
    const [arrIdx, setArrIdx] = useState(0)
    if (!props.notes) {
        return <></>
    }

    const confirmMod = (e) => {
        props.notes.data[arrIdx] = modNote
        setNoteScreen("default");
        setArrIdx(0);
        props.backHandler(e);
    }

    const deleteHandler = (e) => {
        e.preventDefault();
        const id = e.target.parentNode.getAttribute("note_id");
        const action = e.target.textContent;
        switch (action) {
            case "Muuda":
                setNoteScreen(String(id));
                let i = 0;
                props.notes.data.forEach((note) => {
                    console.log(note);
                    if (note.id === Number(id)) {
                        setModNote(note);
                        setArrIdx(i);
                    }
                    i++;
                })
                break;
            case "Kustuta":
                for (let j = 0; j < props.notes.data.length; j++) {
                    if (props.notes.data[j].id === Number(id)) {
                        props.notes.data.splice(j, 1);
                    }
                }
                props.backHandler(e);
                break;
            default:
                console.log("<unknown> " + id);
                break;
        }
    }
    if (noteScreen === "default") {
        return (
            <>
                <Header label={`Märkmed`}></Header>
                <div>
                    <form className={"pt-3"}>
                        {props.notes.data.map((note) => {
                            return <Note
                                note={note} deleteHandler={deleteHandler} key={note.id}></Note>
                        })}
                        <FormButton variant={"success"} handler={props.backHandler} text={"Uus märge"}></FormButton>
                        <FormButton handler={props.backHandler} text={"Tagasi"}></FormButton>
                    </form>
                </div>
            </>
        )
    } else {
        return (
            <>
                <EditNote note={modNote} confirmHandler={confirmMod}></EditNote>
            </>
        )
    }
}

export default Notes;