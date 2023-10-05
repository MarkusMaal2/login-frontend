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
    const [expire, setExpire] = useState(() => {
        if ((localStorage.getItem("expire") !== null)) {
            return Number(localStorage.getItem("expire"));
        } else {
            localStorage.removeItem("expire");
            localStorage.removeItem("session_data");
            return -1;
        }
    });
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
                } else {
                    alert("Välja logimine nurjus");
                }
            }))
            .catch((error) => {
                alert("Viga: " + error);
                console.log("Error: ", error);
            })
    }

    const deleteHandler = () => {
        alert("Pole implementeeritud");
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
                alert("Loodi kasutaja järgmiste andmetega:\nID: " + response.data.id + "\nNimi: " + response.data.name + "\nRäsi: " + response.data.hash)
                console.log("Response: ", response.data)
            }))
            .catch((error) => {
                alert("Viga: " + error);
                console.log("Error: ", error);
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
                console.log("Response: ", response.data)
            }))
            .catch((error) => {
                alert("Viga: " + error);
                console.log("Error: ", error);
            })
    }
    ReactSession.setStoreType=("localStorage")
  return (
      <div>
          { !loggedIn && <LoginForm loginHandler={loginHandler} regHandler={regHandler} submitHandler={submitHandler}/>}
          { loggedIn && <Private deleteHandler={deleteHandler} logoutHandler={logoutHandler} data={data}/>}
      </div>
  );
}

export default App;
