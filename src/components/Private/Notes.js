import React from "react";
import Header from "./Header";
import TextField from "../LoginForm/TextField";
import FormButton from "../LoginForm/FormButton";
import Note from "./Note";


const Notes = (props) => {
    if (!props.notes) {
        return <></>
    }
    const deleteHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
    }

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
}

export default Notes;