import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from "./components/LoginForm/LoginForm";
import axios from "axios";
function App() {
    const endPoint = "http://localhost:8080"
    const [loggedIn, setLogin] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();
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
                alert("Avati session järgmiste andmetega:\nID: " + response.data.id + "\nNimi: " + response.data.name + "\nRäsi: " + response.data.hash + "\nSessioni ID: " + response.data.token);
                console.log("Response: ", response.data)
            }))
            .catch((error) => {
                alert("Viga: " + error);
                console.log("Error: ", error);
            })
    }
  return (
      <div>
        { !loggedIn && <LoginForm loginHandler={loginHandler} regHandler={regHandler} submitHandler={submitHandler}/>}
      </div>
  );
}

export default App;
