import React, {useEffect, useState} from 'react';
import { ReactSession } from "react-client-session";
import logo from './logo.svg';
import './App.css';
import LoginForm from "./components/LoginForm/LoginForm";
import Private from "./components/Private/Private"
import axios from "axios";

let initialExpire = -1;
let initialData;
let initialLogin = false;
function App() {
    const endPoint = "http://localhost:8080"
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [error, setError] = useState("");
    const [expire, setExpire] = useState(() => {
        if ((localStorage.getItem("expire") !== null)) {
            return Number(localStorage.getItem("expire"));
        } else {
            localStorage.removeItem("expire");
            localStorage.removeItem("session_data");
            return -1;
        }
    });

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
            console.log(userData.token);
            return userData;
            /*axios.get(endPoint + "/isloggedin/" + userData.token)
                .then((response => {
                    return userData;
                }))
                .catch((error) => {
                    alert("Teie seanss on aegunud\n" + error);
                    localStorage.removeItem("expire");
                    localStorage.removeItem("session_data");
                    window.location.reload();
                })*/
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
                error.response?setError(getError(error.response)):console.log(error)
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
                console.log("Response: ", response.data)
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
            withCredentials:true
        })
            .then((response => {
                //alert("Avati session järgmiste andmetega:\nID: " + response.data.id + "\nNimi: " + response.data.name + "\nRäsi: " + response.data.hash + "\nSessioni ID: " + response.data.token);
                let expireTime = Date.now() + (30 * 60 * 1000);
                setLogin(true)
                setData(response.data);
                setExpire(expireTime);
                localStorage.setItem("session_data", JSON.stringify(response.data));
                localStorage.setItem("expire", String(expireTime));
                setError("")
                console.log("Response: ", response.data)
            }))
            .catch((error) => {
                setError(getError(error.response))
            })
    }
    ReactSession.setStoreType=("localStorage")
  return (
      <div>
          { !loggedIn && <LoginForm loginHandler={loginHandler} regHandler={regHandler} submitHandler={submitHandler} userName={userName} passWord={passWord} error={error}/>}
          { loggedIn && <Private deleteHandler={deleteHandler} logoutHandler={logoutHandler} data={data} error={error}/>}
      </div>
  );
}

export default App;
