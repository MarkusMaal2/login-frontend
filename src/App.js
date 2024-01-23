import React, {useState} from 'react';
import { ReactSession } from "react-client-session";
import './App.css';
import LoginForm from "./components/LoginForm/LoginForm";
import Private from "./components/Private/Private"
import axios from "axios";
function App() {

    const endPoint = "https://notes-backend-web.onrender.com"
    //const endPoint = "https://localhost:3001/"
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [error, setError] = useState("");
    const [notes, setNotes] = useState();
    const [screen, setScreen] = useState("Info");

    if ((localStorage.getItem("expire") === null)) {
        localStorage.removeItem("expire");
        localStorage.removeItem("session_data");
    }


    const [loggedIn, setLogin] = useState(() => {
        if ((localStorage.getItem("expire") !== null)) {
            let expireTime = Number(localStorage.getItem("expire"));
            let currentTime = Date.now();
            return currentTime < expireTime;
        } else {
            localStorage.removeItem("expire");
            localStorage.removeItem("session_data");
            return false;
        }
    });
    const [data, setData] = useState(() => {
        if (localStorage.getItem("session_data") !== null) {
            let userData = JSON.parse(localStorage.getItem("session_data"));
            //console.log(userData.token);
            axios.get(endPoint + "/isloggedin/" + userData.token)
                .then((response => {
                    return userData;
                }))
                .catch((error) => {
                    alert("Teie seanss on aegunud\n" + error);
                    localStorage.removeItem("expire");
                    localStorage.removeItem("session_data");
                    window.location.reload();
                })
            return userData;
        } else {
            localStorage.removeItem("expire");
            localStorage.removeItem("session_data");
            return {};
        }
    });
    const submitHandler = (e) => {
        e.preventDefault();
    }

    const logoutHandler = () => {
        const uri = endPoint + "/logout";
        axios.get(uri,  {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials:true
        })
            .then((response => {
                if (response.status === 200) {
                    setLogin(false);
                    setData([]);
                    setError("")
                } else {
                    setError(getError(response))
                }
            }))
            .catch((error) => {
                try {
                    error.response ? setError(getError(error.response)) : console.log(error)
                } catch {
                    localStorage.removeItem("expire");
                    localStorage.removeItem("session_data");
                    setLogin(false)
                }
            })
    }

    const deleteHandler = () => {
        axios.delete(endPoint + '/users/' + data.id,  {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials:true
        })
            .then(() => {
                logoutHandler();
                localStorage.clear();
                setError("")
                alert("Konto kustutati");
                window.location.reload();
            })
            .catch((error) => {
                setError(getError(error.response))
            });
    }

    const regHandler = () => {
        const jsonData = {
            name: document.querySelector("#userName").value,
            password: document.querySelector("#passWord").value,
        }

        const uri = endPoint + "/users";

        axios.post(uri, jsonData, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response => {
                setError("")
                alert("Loodi kasutaja järgmiste andmetega:\nID: " + response.data.id + "\nNimi: " + response.data.name + "\nRäsi: " + response.data.hash)
                //console.log("Response: ", response.data)
                setUserName("")
                setPassWord("")
            }))
            .catch((error) => {
                setError(getError(error.response))
                setUserName("")
                setPassWord("")
            })
    }


    const loginHandler = (e) => {
        const jsonData = {
            name: document.querySelector("#userName").value,
            password: document.querySelector("#passWord").value,
        }

        const uri = endPoint + "/login";

        axios.post(uri, jsonData, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }, {withCredentials:true})
            .then((response => {
                //alert("Avati session järgmiste andmetega:\nID: " + response.data.id + "\nNimi: " + response.data.name + "\nRäsi: " + response.data.hash + "\nSessioni ID: " + response.data.token);
                let expireTime = Date.now() + (30 * 60 * 1000);
                setLogin(true)
                setData(response.data);
                //setExpire(expireTime);
                localStorage.setItem("session_data", JSON.stringify(response.data));
                localStorage.setItem("expire", String(expireTime));
                setError("")
                //console.log("Response: ", response.data)
            }))
            .catch((error) => {
                setError(getError(error.response))
            })
    }


    const notesHandler = async (e) => {
        const uri = endPoint + "/notes/" + data.id;

        axios.get(uri, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials:true
        })
            .then((response => {
                //alert("Avati session järgmiste andmetega:\nID: " + response.data.id + "\nNimi: " + response.data.name + "\nRäsi: " + response.data.hash + "\nSessioni ID: " + response.data.token);
                //let expireTime = Date.now() + (30 * 60 * 1000);
                setNotes(response)
                //console.log(response)
                setError("")
                //console.log("Response: ", response.data)
            }))
            .catch((error) => {
                setError(getError(error.response))
            })
    }




// generate user-friendly errors if possible
    const getError = (response) => {
        console.log("Error: ", response.data);
        switch (response.status) {
            case 401:
                switch (response.data.error) {
                    case "Invalid credentials":
                        return "Vale kasutajanimi/parool";
                    case "Not logged in":
                        return "Te pole sisse loginud";
                    case "Missing credentials":
                        return "Palun sisestage kasutajanimi/parool";
                    default:
                        return error.response.data.error.toString() ?? error.response.status;
                }
            case 400:
                switch (response.data.error) {
                    case "One or all params are missing":
                        return "Ebapiisavalt parameetreid";
                    case "The session is already active. Please log out to log in.":
                        return "Sessioon on juba aktiivne. Palun logige välja!";
                    default:
                        return error.response.data.error.toString() ?? error.response.status;
                }
            case 500:
                switch (response.data.error) {
                    case "Error modifying MySQL data":
                        return "MySQL rike back-end poolel"
                    default:
                        return "Määramata rike back-end poolel"
                }
            case 404:
                return "Kasutajat ei leitud"
            case 409:
                return "Kasutaja juba eksisteerib"
            case 200:
                return "Käsk õnnestus"
            case 204:
                return "Käsk õnnestus"
            default:
                return response
        }
    }

    const deleteNote = (e) => {
        const id = e.target.parentElement.getAttribute('note_id');
        axios.delete(endPoint + '/notes/' + data.id + "/" + id,  {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials:true
        })
            .then(() => {
                return true;
            })
            .catch((error) => {
                setError(getError(error.response))
                return false;
            });
        return false;
    }

    const updateNote = (e) => {
        e.preventDefault();
        const targetElement = e.target.parentElement;
        const text = targetElement.parentElement.children[0].value;
        const note_id = targetElement.getAttribute("note_id");

        const uri = endPoint + "/notes/" + data.id + "/" + note_id;

        const jsonData = {
            content: text
        }

        axios.put(uri, jsonData, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials:true
        })
            .then((response => {
                notesHandler(e);
                setScreen("Notes")
            }))
            .catch((error) => {
                setError(getError(error.response))
            })
    }

    const userChangeHandler = (e) => {
        setUserName(e.target.value)
    }
    const passChangeHandler = (e) => {
        setPassWord(e.target.value)
    }

    const switchScreen = (e) => {
        switch (e.target.innerText) {
            case "Muuda infot":
                setScreen("EditInfo")
                break;
            case "Tagasi":
                setScreen("Info")
                break;
            case "Märkmed":
                notesHandler(e)
                setScreen("Notes")
                break;
            case "Uus märge":
                setScreen("NewNote")
                break;
            case "Kustuta":
                if (deleteNote(e)) {
                    notesHandler(e);
                    setScreen("Notes");
                } else {
                    setError("Märkme kustutamine nurjus");
                }
                break;
            case "Kinnita":
                updateNote(e)
                break;
            default:
                setScreen("Info")
                break;
        }
    }

    const updateData = (e) => {
        e.preventDefault();

        if (e.target.textContent !== "Lisa märge") {
            const jsonData = {
                name: document.querySelector("#userName").value,
                password: document.querySelector("#passWord").value,
            }

            const uri = endPoint + "/users/" + data.id;

            axios.put(uri, jsonData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials:true
            })
                .then((response => {
                    alert("Kasutaja info muudeti");
                }))
                .catch((error) => {
                    setError(getError(error.response))
                })
            setScreen("Info")
        } else {
            const jsonData = {
                content: document.querySelector("#noteContent").value,
            }

            const uri = endPoint + "/notes/" + data.id;

            axios.post(uri, jsonData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials:true
            })
                .then((response => {
                    notesHandler(e);
                    setScreen("Notes")
                }))
                .catch((error) => {
                    setError(getError(error.response))
                })
        }
    }

    ReactSession.setStoreType=("localStorage")
  return (
      <div className={"body"}>
          { !loggedIn && <LoginForm loginHandler={loginHandler} regHandler={regHandler} submitHandler={submitHandler} userName={userName} passWord={passWord} error={error} onUserChange={userChangeHandler} onPassChange={passChangeHandler}/>}
          { loggedIn && <Private screen={screen} deleteHandler={deleteHandler} logoutHandler={logoutHandler} data={data} error={error} screenHandler={switchScreen} updateHandler={updateData} newUserName={userName} newPassWord={passWord} onUserChange={userChangeHandler} onPassChange={passChangeHandler} notes={notes}/>}
      </div>
  );
}

export default App;
